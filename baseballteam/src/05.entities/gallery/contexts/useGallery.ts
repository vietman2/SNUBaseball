import { createContext, useContext } from "react";

type GalleryContextType = {
  selectedAlbumId: number | null;
  setSelectedAlbumId: (id: number | null) => void;
};

export const GalleryContext = createContext<GalleryContextType | null>(null);

export function useGallery() {
  const context = useContext(GalleryContext);

  if (!context) {
    throw new Error("useGallery must be used within a GalleryProvider");
  }

  return context;
}
