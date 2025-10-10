import { axiosInstanceWithAuth, type APIResponseType } from "@shared/lib/axios";
import type { PresignItemType, PresignRequestType } from "@shared/lib/storage";

export async function getPresignedUrl(
  id: number,
  data: PresignRequestType
): Promise<APIResponseType<PresignItemType> | null> {
  try {
    const response = await axiosInstanceWithAuth.post(
      `/api/v1/members/${id}/avatar/presign/`,
      data
    );

    return {
      data: response.data as PresignItemType,
      status: "SUCCESS",
    };
  } catch {
    return null;
  }
}
