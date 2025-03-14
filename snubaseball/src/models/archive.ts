type ImageType = {
  id: number;
  url: string;
}

export type MemoriesType = {
  year: string;
  images: ImageType[];
};

export type InterviewType = {
  id: number;
  title: string;
  member: string;
  date: string;
  images: ImageType[];
}

export type AlbumType = {
  id: number;
  title: string;
  cover_images: ImageType[];
  num_images: number;
  num_videos: number;
}

export type MediaType = {
  id: number;
  url: string;
  type: "이미지" | "비디오";
  width: number;
  height: number;
  length?: number; // 동영상만 해당
};
