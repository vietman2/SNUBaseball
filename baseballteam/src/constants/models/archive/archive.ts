import { MemberMiniType } from "@models/user";

export type AlbumType = {
  id: number;
  title: string;
  description: string;
  cover_images: MediaType[];
  num_images: number;
  num_videos: number;
};

export type MediaTagType = {
  id: number;
  name: string;
}

export type MediaResponseType = {
  count: number;
  current_page: number;
  next: string | null;
  num_pages: number;
  previous: string | null;
  results: MediaType[];
}

export type MediaType = {
  id: number;
  url: string;
  type: "이미지" | "비디오";
  width: number;
  height: number;
  length?: number; // 동영상만 해당
}

export type ImageType = {
  id: number;
  url: string;
  album: {
    id: number;
    title: string;
  };
  tags: MediaTagType[];
  people: MemberMiniType[];
  uploaded_at: string;
  uploaded_by: MemberMiniType;
  exif_data: any; // TODO: 타입 정의
};

export type VideoType = {
  id: number;
  url: string;
};
