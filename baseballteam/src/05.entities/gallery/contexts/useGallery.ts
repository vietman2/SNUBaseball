import { createContext, useContext } from "react";

import type { MediaTagType } from "../models/tags";
import type { AlbumType } from "../models/album";

interface GalleryContextType {
  albums: AlbumType[];
  tags: MediaTagType[];
  isLoading: boolean;
  isError: boolean;
}

export const GalleryContext = createContext<GalleryContextType | null>(null);

export function useGallery() {
  const context = useContext(GalleryContext);

  if (!context) {
    throw new Error("useGallery must be used within a GalleryProvider");
  }

  return context;
}
