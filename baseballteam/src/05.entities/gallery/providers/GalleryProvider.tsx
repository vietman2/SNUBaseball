import { useMemo, type ReactNode } from "react";

import { useGalleryData } from "../api/getGalleryData";
import { GalleryContext } from "../contexts/useGallery";

interface Props {
  children: ReactNode;
}

export function GalleryProvider({ children }: Readonly<Props>) {
  const { data, isLoading, isError, refetch } = useGalleryData();

  const value = useMemo(() => {
    return {
      albums: data ? data.albums : [],
      tags: data ? data.tags : [],
      isLoading,
      isError,
      refresh: refetch,
    };
  }, [data, isLoading, isError, refetch]);

  return (
    <GalleryContext.Provider value={value}>{children}</GalleryContext.Provider>
  );
}
