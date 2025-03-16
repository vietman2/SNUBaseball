import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";

import { AlbumType, MediaType } from "@models/archive";
import { getAlbums, getAlbumImages, getMedia } from "@services/archive";

interface GalleryContextType {
  albums: AlbumType[];
  files: MediaType[];
  media: MediaType | undefined;
  loading: boolean;
}

const GalleryContext = createContext<GalleryContextType | undefined>(undefined);

export function GalleryProvider({ children }: { children: React.ReactNode }) {
  const [albums, setAlbums] = useState<AlbumType[]>([]);
  const [files, setFiles] = useState<MediaType[]>([]);
  const [media, setMedia] = useState<MediaType>();
  const [loading, setLoading] = useState<boolean>(true);

  const { albumId, mediaId } = useParams();

  useEffect(() => {
    const getData = async () => {
      setLoading(true);

      const albums = await getAlbums();

      if (albums) {
        setAlbums(albums);
      }

      setLoading(false);
    };

    getData();
  }, []);

  useEffect(() => {
    const getData = async () => {
      if (!albumId) {
        return;
      }

      setLoading(true);

      const files = await getAlbumImages(albumId);

      if (files) {
        setFiles(files);
      }

      setLoading(false);
    };

    getData();
  }, [albumId]);

  useEffect(() => {
    const fetchData = async () => {
      if (!mediaId) return;

      setLoading(true);

      const response = await getMedia(mediaId);

      if (response) {
        setMedia(response);
      }

      setLoading(false);
    };

    fetchData();
  }, [mediaId]);

  const value = useMemo(
    () => ({ albums, files, media, loading }),
    [albums, files, media, loading]
  );

  return (
    <GalleryContext.Provider value={value}>{children}</GalleryContext.Provider>
  );
}

export function useGallery() {
  const context = useContext(GalleryContext);

  if (!context) {
    throw new Error("useGallery must be used within a GalleryProvider");
  }

  return context;
}
