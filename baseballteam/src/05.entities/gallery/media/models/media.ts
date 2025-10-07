import {
  sampleAlbumSimple,
  type AlbumSimpleType,
} from "@entities/gallery/album/@x/media";
import { sampleTags, type MediaTagType } from "@entities/gallery/tags/@x/media";
import type { UserRelatedType } from "@entities/user/@x/media";

/* 여기서 Media란, Image와 Video를 지칭하는 개념 */

type CommonFields = {
  id: number;
  key: string;
  url: string;
  filename: string;
  album: AlbumSimpleType;
  tags: MediaTagType[]; // 이름들만
  created_at: string;
  uploaded_by: UserRelatedType;
};

type GalleryImageType = {
  type: "IMAGE";
} & CommonFields;

type GalleryVideoType = {
  type: "VIDEO";
  thumbnail_url: string;
} & CommonFields;

export type MediaType = GalleryImageType | GalleryVideoType;

export const sampleGalleryImage: GalleryImageType = {
  id: 1,
  type: "IMAGE",
  key: "gallery/sample-image-key",
  url: "https://via.placeholder.com/600",
  filename: "sample-image.jpg",
  album: sampleAlbumSimple,
  tags: [sampleTags[0], sampleTags[1]],
  created_at: "2025-01-01",
  uploaded_by: {
    uuid: "admin-uuid",
    name: "admin",
  },
};

export const sampleGalleryVideo: GalleryVideoType = {
  id: 1,
  type: "VIDEO",
  key: "gallery/sample-video-key",
  url: "https://via.placeholder.com/600",
  thumbnail_url: "https://via.placeholder.com/150",
  filename: "sample-video.mp4",
  album: sampleAlbumSimple,
  tags: [],
  created_at: "2025-01-02",
  uploaded_by: {
    uuid: "user1-uuid",
    name: "user1",
  },
};
