import mimetypes
from django.db.models import Q
from drf_spectacular.utils import extend_schema
from rest_framework import status
from rest_framework.decorators import action
from rest_framework.exceptions import ValidationError
from rest_framework.pagination import PageNumberPagination
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet

from core.permissions import IsAdmin
from person.member.models import Member
from .enums import MediaType
from .models import Album, BaseMedia, Tag, Image
from .serializers import (
    AlbumSerializer, ImageSerializer, VideoSerializer,
    MediaSerializer, TagSerializer, MemorySerializer
)

class ArchivePageNumberPagination(PageNumberPagination):
    page_size = 25
    page_size_query_param = 'page_size'
    max_page_size = 1000

    def get_paginated_response(self, data):
        return Response({
            'count': self.page.paginator.count,
            'next': self.get_next_link(),
            'previous': self.get_previous_link(),
            'results': data,
            'num_pages': self.page.paginator.num_pages,
            'current_page': self.page.number,
        })

class ArchiveViewSet(ModelViewSet):
    serializer_class = MediaSerializer
    queryset = BaseMedia.objects.all()
    pagination_class = ArchivePageNumberPagination
    http_method_names = ['post', 'get', 'delete', 'patch']

    def get_permissions(self):
        if self.action in ['memories', 'retrieve']:
            return [AllowAny()]
        return [IsAuthenticated()]

    @extend_schema(summary="파일 업로드", tags=["갤러리"])
    def create(self, request, *args, **kwargs):
        files = request.FILES.getlist('files')
        options = request.data.get('options', {})
        ## data given in multipart/form-data
        ## convert options to JSON
        if isinstance(options, str):
            options = eval(options)

        if not files:
            return Response(
                status=status.HTTP_400_BAD_REQUEST,
                data={'message': 'No files were uploaded.'}
            )

        for file in files:
            mime_type, _ = mimetypes.guess_type(file.name)

            if mime_type and mime_type.startswith('image'):
                serializer = ImageSerializer(data={'file': file, **options})
            elif mime_type and mime_type.startswith('video'):
                serializer = VideoSerializer(data={'file': file})
            else:
                return Response(
                    status=status.HTTP_400_BAD_REQUEST,
                    data={'message': 'Invalid file type.'}
                )

            try:
                serializer.is_valid(raise_exception=True)
                serializer.save(uploaded_by=request.user)
            except ValidationError as e:
                return Response(
                    status=status.HTTP_400_BAD_REQUEST,
                    data={'message': str(e)}
                )

        return Response(
            status=status.HTTP_201_CREATED,
            data={'message': 'Files uploaded successfully.'}
        )

    @extend_schema(summary="파일 목록 조회", tags=["갤러리"])
    def list(self, request, *args, **kwargs):
        ## 앨범, 태그, 사람에 대한 query가 들어올 수 있다.
        album_id = request.query_params.get('album')
        tag_id = request.query_params.get('tag')
        member_id = request.query_params.get('member')

        q = Q()

        if album_id:
            ## 미분류 (-1)가 옵션으로 들어올 수 있음
            if album_id == '-1':
                q &= Q(album__isnull=True)
            else:
                q &= Q(album_id=album_id)
        if tag_id:
            q &= Q(tags__id=tag_id)
        if member_id:
            q &= Q(people__id=member_id)

        queryset = BaseMedia.objects.filter(q)

        page = self.paginate_queryset(queryset)
        serializer = MediaSerializer(page, many=True)
        return self.get_paginated_response(serializer.data)

    @extend_schema(summary="파일 조회", tags=["갤러리"])
    def retrieve(self, request, *args, **kwargs):
        obj = self.get_object()

        if obj.type == MediaType.IMAGE:
            serializer = ImageSerializer(obj.image)
        else:
            serializer = VideoSerializer(obj.video)

        return Response(serializer.data, status=status.HTTP_200_OK)

    @extend_schema(summary="파일 삭제", tags=["갤러리"])
    def destroy(self, request, *args, **kwargs):
        obj = self.get_object()
        obj.delete()

        return Response(status=status.HTTP_204_NO_CONTENT)

    @extend_schema(summary="파일 수정", tags=["갤러리"])
    def partial_update(self, request, *args, **kwargs):
        obj = self.get_object()

        album = request.data.get('album', None)
        tag = request.data.get('tag', None)
        person = request.data.get('person', None)

        if album:
            if int(album) == -1:
                obj.album = None
            else:
                obj.album_id = album
        elif tag:
            ## 이미 있으면 제거,
            ## 아직 없으면 추가
            tag = Tag.objects.get(id=tag)
            if tag in obj.tags.all():
                obj.tags.remove(tag)
            else:
                obj.tags.add(tag)
        elif person:
            ## 이미 있으면 제거,
            ## 아직 없으면 추가
            person = Member.objects.get(id=person)
            if person in obj.people.all():
                obj.people.remove(person)
            else:
                obj.people.add(person)
        else:
            return Response(
                status=status.HTTP_400_BAD_REQUEST,
                data={'message': 'Invalid data.'}
            )

        obj.save()

        if obj.type == MediaType.IMAGE:
            serializer = ImageSerializer(obj.image)
        else:
            serializer = VideoSerializer(obj.video)

        return Response(serializer.data, status=status.HTTP_200_OK)

    @extend_schema(summary="홈피 대표 사진 조회", tags=["갤러리"])
    @action(detail=False, methods=['get'])
    def memories(self, request, *args, **kwargs):
        tag1 = Tag.objects.get(name="2025")
        ## get images that include the tag
        queryset1 = Image.objects.filter(base__tags__id=tag1.id)
        ## get random 4 images
        queryset1 = queryset1.order_by('?')[:4]
        serializer1 = MemorySerializer(queryset1, many=True)

        tag2 = Tag.objects.get(name="2024")
        queryset2 = Image.objects.filter(base__tags__id=tag2.id)
        queryset2 = queryset2.order_by('?')[:4]
        serializer2 = MemorySerializer(queryset2, many=True)

        return Response(data=[
            {'year': 2025, 'images': serializer1.data},
            {'year': 2024, 'images': serializer2.data}
        ], status=status.HTTP_200_OK)

class AlbumViewSet(ModelViewSet):
    serializer_class = AlbumSerializer
    pagination_class = ArchivePageNumberPagination
    queryset = Album.objects.all()
    http_method_names = ['get', 'post', 'delete', 'put']

    def get_permissions(self):
        if self.action in ['list', 'retrieve']:
            return [AllowAny()]
        return [IsAdmin()]

    @extend_schema(summary="앨범 생성", tags=["갤러리"])
    def create(self, request, *args, **kwargs):
        serializer = AlbumSerializer(data=request.data)

        try:
            serializer.is_valid(raise_exception=True)
            serializer.save()
        except ValidationError as e:
            return Response(
                status=status.HTTP_400_BAD_REQUEST,
                data={'message': str(e)}
            )

        return Response(
            status=status.HTTP_201_CREATED,
            data={'message': 'Album created successfully.'}
        )

    @extend_schema(summary="앨범 목록 조회", tags=["갤러리"])
    def list(self, request, *args, **kwargs):
        ## 로그인 되어있으면, members_only앨범도 반환
        ## 그렇지 않으면, members_only=False인 앨범만 반환
        if request.user.is_authenticated:
            queryset = self.get_queryset()
        else:
            queryset = self.get_queryset().filter(members_only=False)

        serializer = AlbumSerializer(queryset, many=True)

        data = serializer.data

        media_without_album = BaseMedia.objects.filter(album__isnull=True)
        random_media = media_without_album.filter(type=MediaType.IMAGE).order_by('?')[:3]

        if request.user.is_authenticated:
            data.append({
                'id': -1,
                'title': '미분류',
                'cover_images': MediaSerializer(random_media, many=True).data,
                'num_images': media_without_album.filter(type=MediaType.IMAGE).count(),
                'num_videos': media_without_album.filter(type=MediaType.VIDEO).count()
            })

        return Response(data, status=status.HTTP_200_OK)

    @extend_schema(summary="앨범 조회", tags=["갤러리"])
    def retrieve(self, request, *args, **kwargs):
        album = self.get_object()

        ## 로그인이 안돼있고, 멤버 전용 앨범이면 403
        if not request.user.is_authenticated and album.members_only:
            return Response(
                status=status.HTTP_403_FORBIDDEN,
                data={'message': 'This album is for members only.'}
            )

        media = album.media.all()

        #page = self.paginate_queryset(media)
        serializer = MediaSerializer(media, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
        #return self.get_paginated_response(serializer.data)

    @extend_schema(summary="앨범 수정", tags=["갤러리"])
    def update(self, request, *args, **kwargs):
        obj = self.get_object()
        serializer = AlbumSerializer(obj, data=request.data, partial=True)

        try:
            serializer.is_valid(raise_exception=True)
            serializer.save()
        except ValidationError as e:
            return Response(
                status=status.HTTP_400_BAD_REQUEST,
                data={'message': str(e)}
            )

        return Response(
            status=status.HTTP_200_OK,
            data={'message': 'Album updated successfully.'}
        )

    @extend_schema(summary="앨범 삭제", tags=["갤러리"])
    def destroy(self, request, *args, **kwargs):
        obj = self.get_object()
        obj.delete()

        return Response(status=status.HTTP_204_NO_CONTENT)

class TagViewSet(ModelViewSet):
    serializer_class = TagSerializer
    queryset = Tag.objects.all()
    permission_classes = [IsAuthenticated,]
    http_method_names = ['get', 'post']

    @extend_schema(summary="태그 생성", tags=["갤러리"])
    def create(self, request, *args, **kwargs):
        serializer = TagSerializer(data=request.data)

        try:
            serializer.is_valid(raise_exception=True)
            serializer.save()
        except ValidationError as e:
            return Response(
                status=status.HTTP_400_BAD_REQUEST,
                data={'message': str(e)}
            )

        return Response(
            status=status.HTTP_201_CREATED,
            data={'message': 'Tag created successfully.'}
        )

    @extend_schema(summary="태그 목록 조회", tags=["갤러리"])
    def list(self, request, *args, **kwargs):
        queryset = self.get_queryset()
        serializer = TagSerializer(queryset, many=True)

        return Response(serializer.data, status=status.HTTP_200_OK)

    @extend_schema(exclude=True)
    def retrieve(self, request, *args, **kwargs):
        return Response(status=status.HTTP_405_METHOD_NOT_ALLOWED)
