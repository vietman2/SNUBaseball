import { useQuery } from "@tanstack/react-query";

import type { MediaTagType } from "../models/tags";
import { axiosInstanceWithAuth } from "@shared/lib/axios";

async function fetchTagsAPI(): Promise<MediaTagType[]> {
  const response = await axiosInstanceWithAuth.get<MediaTagType[]>(
    "/api/v1/gallery/tags/"
  );

  return response.data;
}

/**
 * React Query를 사용하여 미디어 태그 목록을 가져오는 훅
 * @returns React Query의 쿼리 결과 (data는 MediaTagType[] 형태)
 */
export function useMediaTagsAPI() {
  return useQuery<MediaTagType[], Error>({
    queryKey: ["tags"],
    queryFn: fetchTagsAPI,
  });
}
