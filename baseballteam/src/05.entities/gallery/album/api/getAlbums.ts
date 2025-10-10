import { useQuery } from "@tanstack/react-query";

import type { AlbumType } from "../models/album";
import { axiosInstanceWithAuth } from "@shared/lib/axios";

async function fetchAlbumsAPI(): Promise<AlbumType[]> {
  const response = await axiosInstanceWithAuth.get<AlbumType[]>(
    "/api/v1/gallery/albums/"
  );

  return response.data;
}

/**
 * React Query를 사용하여 앨범 목록을 가져오는 훅
 * @returns React Query의 쿼리 결과 (data는 AlbumType[] 형태)
 */
export function useAlbumsAPI() {
  return useQuery<AlbumType[], Error>({
    queryKey: ["albums"],
    queryFn: fetchAlbumsAPI,
  });
}
