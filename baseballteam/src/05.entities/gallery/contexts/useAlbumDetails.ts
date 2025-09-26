import { createContext, useContext } from "react";

import type { AlbumType } from "../models/album";
import type { GalleryMediaType } from "../models/media";
import type { BreadcrumbItemType } from "@shared/lib/views";

export type AlbumDetailsContextType = {
  isLoading: boolean;
  isError: boolean;
  breadcrumbItems: BreadcrumbItemType[];
  data: {
    album: AlbumType;
    media: GalleryMediaType[];
  } | null;
};

export const AlbumDetailsContext =
  createContext<AlbumDetailsContextType | null>(null);

export function useAlbumDetails() {
  const context = useContext(AlbumDetailsContext);

  if (!context) {
    throw new Error(
      "useAlbumDetails must be used within an AlbumDetailsProvider"
    );
  }

  return context;
}
