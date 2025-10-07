import {
  sampleAlbumSimple,
  type AlbumSimpleType,
} from "@entities/gallery/album/@x/media";
import { sampleTags, type MediaTagType } from "@entities/gallery/tags/@x/media";

/* 여기서 Media란, Image와 Video를 지칭하는 개념 */

type CommonFields = {
  key: string;
  url: string;
  filename: string;
  album: AlbumSimpleType;
  tags: MediaTagType[]; // 이름들만
  created_at: string;
  uploaded_by: string;
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
  type: "IMAGE",
  key: "gallery/sample-image-key",
  url: "https://via.placeholder.com/600",
  filename: "sample-image.jpg",
  album: sampleAlbumSimple,
  tags: sampleTags,
  created_at: "2025-01-01",
  uploaded_by: "admin",
};

export const sampleGalleryVideo: GalleryVideoType = {
  type: "VIDEO",
  key: "gallery/sample-video-key",
  url: "https://via.placeholder.com/600",
  thumbnail_url: "https://via.placeholder.com/150",
  filename: "sample-video.mp4",
  album: sampleAlbumSimple,
  tags: [sampleTags[0]],
  created_at: "2025-01-02",
  uploaded_by: "user1",
};
