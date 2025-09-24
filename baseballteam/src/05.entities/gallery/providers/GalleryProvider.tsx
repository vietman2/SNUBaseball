import { useMemo, useState, type ReactNode } from "react";

import { GalleryContext } from "../contexts/useGallery";

interface Props {
  children: ReactNode;
}

export function GalleryProvider({ children }: Readonly<Props>) {
  const [selectedAlbumId, setSelectedAlbumId] = useState<number | null>(null);

  const value = useMemo(
    () => ({
      selectedAlbumId,
      setSelectedAlbumId,
    }),
    [selectedAlbumId]
  );

  return (
    <GalleryContext.Provider value={value}>{children}</GalleryContext.Provider>
  );
}
