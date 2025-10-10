import { useEffect, useMemo, useState, type ReactNode } from "react";
import { useSearchParams } from "react-router";

import {
  AlbumsContext,
  type AlbumType,
  useAlbumsAPI,
} from "@entities/gallery/album";

interface Props {
  children: ReactNode;
}

export function AlbumProvider({ children }: Readonly<Props>) {
  const [selectedAlbum, setSelectedAlbum] = useState<AlbumType | null>(null);
  const [searchParams, setSearchParams] = useSearchParams();

  const { data: albums, isLoading, isError, refetch } = useAlbumsAPI();

  useEffect(() => {
    const albumTitle = searchParams.get("album");
    if (albums && albumTitle) {
      const foundAlbum = albums.find((album) => album.title === albumTitle);
      if (foundAlbum) {
        setSelectedAlbum(foundAlbum);
      } else {
        // URL에 해당하는 앨범이 없으면 선택 해제하고,
        // URL을 초기화
        searchParams.delete("album");
        setSearchParams(searchParams);
        setSelectedAlbum(null);
      }
    } else {
      setSelectedAlbum(null);
    }
  }, [albums, searchParams, setSearchParams]);

  const albumsValue = useMemo(
    () => ({
      albums: albums ?? [],
      selectedAlbum,
      refresh: refetch,
      isLoading,
      isError,
    }),
    [albums, selectedAlbum, isLoading, isError, refetch]
  );

  return (
    <AlbumsContext.Provider value={albumsValue}>
      {children}
    </AlbumsContext.Provider>
  );
}
