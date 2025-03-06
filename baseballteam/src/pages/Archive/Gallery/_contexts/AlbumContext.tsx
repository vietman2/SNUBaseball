import { createContext, useContext, useEffect, useMemo, useState } from "react";

import { AlbumType } from "@models/archive";
import { createAlbum, getAlbums } from "@services/archive";

interface AlbumContextType {
  albums: AlbumType[];
  selectedAlbum: AlbumType | null;
  selectAlbum: (album: AlbumType | null) => void;
  createNewAlbum: (title: string) => Promise<boolean>;
}

const AlbumContext = createContext<AlbumContextType | undefined>(undefined);

export function AlbumProvider({ children }: { children: React.ReactNode }) {
  const [albums, setAlbums] = useState<AlbumType[]>([]);
  const [selectedAlbum, setSelectedAlbum] = useState<AlbumType | null>(null);

  const fetchAlbums = async () => {
    const response = await getAlbums();

    if (response) {
      setAlbums(response);
    }
  };

  useEffect(() => {
    fetchAlbums();
  }, []);

  const createNewAlbum = async (title: string) => {
    const response = await createAlbum(title);

    if (response) {
      await fetchAlbums();
      return true;
    } else {
      return false;
    }
  };

  const value = useMemo(
    () => ({
      albums,
      selectedAlbum,
      selectAlbum: (album: AlbumType | null) => setSelectedAlbum(album),
      createNewAlbum,
    }),
    [albums, selectedAlbum]
  );

  return (
    <AlbumContext.Provider value={value}>{children}</AlbumContext.Provider>
  );
}

export function useAlbum() {
  const context = useContext(AlbumContext);

  if (!context) {
    throw new Error("useAlbum must be used within a AlbumProvider");
  }

  return context;
}
