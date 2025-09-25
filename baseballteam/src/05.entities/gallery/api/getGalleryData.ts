import { useQuery } from "@tanstack/react-query";

import type { GalleryDataResponseType } from "../models/response.types";
import { axiosInstanceWithAuth } from "@shared/lib/axios";

async function fetchGalleryDataAPI(): Promise<GalleryDataResponseType> {
  const response = await axiosInstanceWithAuth.get<GalleryDataResponseType>(
    "/api/v1/gallery/"
  );

  return response.data;
}

export function useGalleryData() {
  return useQuery<GalleryDataResponseType, Error>({
    queryKey: ["gallery"],
    queryFn: fetchGalleryDataAPI,
  });
}
