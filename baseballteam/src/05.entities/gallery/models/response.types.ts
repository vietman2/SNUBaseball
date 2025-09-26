import type { AlbumType } from "./album";
import type { MediaTagType } from "./tags";

export type GalleryDataResponseType = {
  albums: AlbumType[];
  tags: MediaTagType[];
};
