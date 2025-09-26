import { axiosInstanceWithAuth, type APIResponseType } from "@shared/lib/axios";
import { type SinglePresignItemType } from "@shared/lib/storage";

export async function getPresignedUrl(
  id: number,
  file: File
): Promise<APIResponseType<SinglePresignItemType> | null> {
  try {
    const response = await axiosInstanceWithAuth.post(
      `/api/v1/members/${id}/avatar/presign/`,
      {
        filename: file.name,
        content_type: file.type,
        size: file.size,
      }
    );

    return {
      data: response.data as SinglePresignItemType,
      status: "SUCCESS",
    };
  } catch {
    return null;
  }
}
