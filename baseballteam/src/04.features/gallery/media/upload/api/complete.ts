import type { RequestItemType } from "../models/request";
import { axiosInstanceWithAuth } from "@shared/lib/axios";

export async function completeUpload(
  id: number,
  tagIDs: number[],
  items: RequestItemType[]
): Promise<boolean> {
  const itemsData = items.map((item) => ({
    key: item.key,
    original_filename: item.original_filename,
  }));

  try {
    await axiosInstanceWithAuth.post(
      `/api/v1/gallery/albums/${id}/upload/complete/`,
      {
        tag_ids: tagIDs,
        items: itemsData,
      }
    );

    return true;
  } catch {
    return false;
  }
}
