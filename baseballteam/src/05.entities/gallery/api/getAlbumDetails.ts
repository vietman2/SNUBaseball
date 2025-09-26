import { useQuery } from "@tanstack/react-query";

import type { AlbumDetailsResponseType } from "../models/album";
import { axiosInstanceWithAuth } from "@shared/lib/axios";

async function fetchAlbumDetailsAPI(
  albumId: number
): Promise<AlbumDetailsResponseType> {
  const response = await axiosInstanceWithAuth.get<AlbumDetailsResponseType>(
    `/api/v1/gallery/albums/${albumId}/`
  );

  return response.data;
}

export function useAlbumDetails(albumId: number) {
  return useQuery<AlbumDetailsResponseType, Error>({
    queryKey: ["albumDetails", albumId],
    queryFn: () => fetchAlbumDetailsAPI(albumId),
    enabled: !!albumId,
  });
}
