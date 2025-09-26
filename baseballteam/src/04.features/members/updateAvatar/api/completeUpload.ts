import type { AvatarUploadResultType } from "../models/response";
import { axiosInstanceWithAuth, type APIResponseType } from "@shared/lib/axios";

export async function postUpload(
  id: number,
  key: string,
  originalFilename: string
): Promise<APIResponseType<AvatarUploadResultType> | null> {
  try {
    const response = await axiosInstanceWithAuth.patch(
      `/api/v1/members/${id}/avatar/complete/`,
      {
        key,
        original_filename: originalFilename,
      }
    );

    return {
      data: response.data as AvatarUploadResultType,
      status: "SUCCESS",
    };
  } catch {
    return null;
  }
}
