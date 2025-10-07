import { createContext, useContext } from "react";

import type { AlbumType } from "@entities/gallery/album";
import type { MediaTagType } from "@entities/gallery/tags";

interface UploadMediaFormContext {
  // 메타 관련
  selectedAlbum: AlbumType | null;
  selectAlbum: (album: AlbumType | null) => void;
  selectedTags: MediaTagType[];
  selectTag: (tag: MediaTagType) => void;

  submit: () => void;
  isReady: boolean;
}

export const UploadMediaFormContext =
  createContext<UploadMediaFormContext | null>(null);

export function useUploadMediaForm() {
  const context = useContext(UploadMediaFormContext);
  if (!context) {
    throw new Error(
      "useUploadMediaForm must be used within an UploadMediaFormProvider"
    );
  }
  return context;
}
