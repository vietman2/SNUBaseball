import { useQuery } from "@tanstack/react-query";

import type { AlbumType } from "../models/album";
import { axiosInstanceWithAuth } from "@shared/lib/axios";

async function fetchAlbumsAPI(): Promise<AlbumType[]> {
  const response = await axiosInstanceWithAuth.get<AlbumType[]>(
    "/api/v1/gallery/albums/"
  );

  return response.data;
}

export function useAlbums() {
  return useQuery<AlbumType[], Error>({
    queryKey: ["albums"],
    queryFn: fetchAlbumsAPI,
  });
}
