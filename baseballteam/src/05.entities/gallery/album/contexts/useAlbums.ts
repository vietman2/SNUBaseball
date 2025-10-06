import { createContext, useContext } from "react";

import type { AlbumType } from "../models/album";

interface AlbumsContextType {
  // 서버 API로부터 받아온 데이터 (페이지에 표시할 데이터)
  albums: AlbumType[];

  // 필터
  selectedAlbum: AlbumType | null;

  // 액션
  refresh: () => void;

  // 상태
  isLoading: boolean;
  isError: boolean;
}

export const AlbumsContext = createContext<AlbumsContextType | null>(null);

export function useAlbums() {
  const context = useContext(AlbumsContext);

  if (!context) {
    throw new Error("useAlbums must be used within a AlbumsProvider");
  }

  return context;
}
