import type { GalleryMediaType } from "./media";

export type AlbumType = {
  id: number;
  title: string;
  members_only: boolean;
  cover_images: GalleryMediaType[];
  num_images: number;
  num_videos: number;
};
