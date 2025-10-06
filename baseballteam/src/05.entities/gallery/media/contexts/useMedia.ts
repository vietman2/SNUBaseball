import { createContext, useContext } from "react";

import type { MediaType } from "../models/media";

interface MediaContextType {
  media: MediaType[];
  num_pages: number;
  current_page: number;
  page_size: number;

  // 액션
  refresh: () => void;

  // 선택된 미디어 (미디어 상세보기용)
  selectedMedia: MediaType | null;

  // 상태
  isLoading: boolean;
  isError: boolean;
}

export const MediaContext = createContext<MediaContextType | null>(null);

export function useMedia() {
  const context = useContext(MediaContext);

  if (!context) {
    throw new Error("useMedia must be used within a MediaProvider");
  }

  return context;
}
