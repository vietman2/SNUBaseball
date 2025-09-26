import { createContext, useContext } from "react";

import type { AlbumType } from "../models/album";
import type { MediaTagType } from "../models/tags";

interface MediaSelectsContextType {
  selectedAlbum: AlbumType | null;
  setSelectedAlbum: (album: AlbumType | null) => void;
  selectedTags: MediaTagType[];
  selectTag: (tag: MediaTagType) => void;

  payload: {
    album: AlbumType | null;
    tags: MediaTagType[];
  };
}

export const MediaSelectsContext =
  createContext<MediaSelectsContextType | null>(null);

export function useMediaSelects() {
  const context = useContext(MediaSelectsContext);

  if (!context) {
    throw new Error(
      "useMediaSelects must be used within a MediaSelectsProvider"
    );
  }

  return context;
}
