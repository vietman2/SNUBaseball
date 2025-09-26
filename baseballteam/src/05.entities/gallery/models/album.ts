import type { MediaThumbnailType } from "./media";

export type AlbumType = {
  id: number;
  title: string;
  members_only: boolean;
  cover_images: MediaThumbnailType[];
  num_images: number;
  num_videos: number;
};

export type AlbumDetailsResponseType = {
  album: AlbumType;
  media: MediaThumbnailType[];
  current_page: number;
  next_page_url: string | null;
  prev_page_url: string | null;
  num_pages: number;
  total_media: number;
};
