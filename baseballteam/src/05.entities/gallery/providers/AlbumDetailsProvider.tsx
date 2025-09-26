import { useMemo, type ReactNode } from "react";

import { useAlbumDetails } from "../api/getAlbumDetails";
import {
  AlbumDetailsContext,
  type AlbumDetailsContextType,
} from "../contexts/useAlbumDetails";

interface Props {
  children: ReactNode;
  albumId: number;
}

export function AlbumDetailsProvider({ children, albumId }: Readonly<Props>) {
  const { data: response, isLoading, isError } = useAlbumDetails(albumId);

  const data = useMemo(() => {
    if (!response) return null;

    return {
      album: response.album,
      media: response.media,
    };
  }, [response]);

  const breadcrumbItems = useMemo(() => {
    if (!data)
      return [
        {
          label: "갤러리",
          href: "/gallery",
        },
      ];

    return [
      {
        label: "갤러리",
        href: "/gallery",
      },
      {
        label: data.album.title,
        href: `/gallery/album/${data.album.id}`,
      },
    ];
  }, [data]);

  const value = useMemo<AlbumDetailsContextType>(() => {
    return {
      isLoading,
      isError,
      breadcrumbItems,
      data,
    };
  }, [data, breadcrumbItems, isLoading, isError]);

  return (
    <AlbumDetailsContext.Provider value={value}>
      {children}
    </AlbumDetailsContext.Provider>
  );
}
