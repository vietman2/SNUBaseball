import { useQuery } from "@tanstack/react-query";

import type { MediaType } from "../models/media";
import { axiosInstanceWithAuth } from "@shared/lib/axios";

type MediaResponseType = {
  count: number;
  pages: number;
  page: number;
  page_size: number;
  results: MediaType[];
};

async function fetchMediaAPI(
  albumTitle?: string,
  tagIds?: number[],
  page?: number
): Promise<MediaResponseType> {
  const params = new URLSearchParams();
  if (albumTitle) {
    params.set("album", albumTitle);
  }
  for (const tagId of tagIds ?? []) {
    params.append("tags", String(tagId));
  }
  if (page) {
    params.set("page", String(page));
  }

  const response = await axiosInstanceWithAuth.get<MediaResponseType>(
    "/api/v1/gallery/media/",
    { params }
  );

  return response.data;
}

/**
 * React Query를 사용하여 미디어 목록을 가져오는 훅
 * @returns React Query의 쿼리 결과 (data는 MediaType[] 형태)
 */
export function useMediaAPI(
  albumTitle?: string,
  tagIds?: number[],
  page?: number
) {
  return useQuery<MediaResponseType, Error>({
    queryKey: ["media", albumTitle, tagIds, page],
    queryFn: () => fetchMediaAPI(albumTitle, tagIds, page),
  });
}
