import { MemberMiniType } from "@models/user";

export type AlbumType = {
  id: number;
  title: string;
  cover_images: MediaType[];
  num_images: number;
  num_videos: number;
  members_only: boolean;
};

export type MediaTagType = {
  id: number;
  name: string;
};

export type MediaResponseType = {
  count: number;
  current_page: number;
  next: string | null;
  num_pages: number;
  previous: string | null;
};

export type MediaType = {
  id: number;
  url: string;
  type: "이미지" | "비디오";
  width: number;
  height: number;
  length?: number; // 동영상만 해당
};

export type MediaDetailType = {
  id: number;
  base_id: number;
  url: string;
  album: AlbumType | null;
  tags: MediaTagType[];
  people: MemberMiniType[];
  title: string;
  uploaded_at: string;
  uploaded_by: MemberMiniType;
  type: "이미지" | "비디오";
};

export type ImageType = {
  exif_data: {
    DateTimeOriginal: string;
    Make: string;
    Model: string;
  }; // TODO: 타입 정의
} & MediaDetailType;

export type VideoType = {
  duration: number;
  thumbnail: string;
} & MediaDetailType;
