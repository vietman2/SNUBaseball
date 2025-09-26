import { axiosInstanceWithAuth, type APIResponseType } from "@shared/lib/axios";
import {
  type SinglePresignItemType,
  type SinglePresignRequestType,
} from "@shared/lib/storage";

export async function getPresignedUrl(
  id: number,
  data: SinglePresignRequestType
): Promise<APIResponseType<SinglePresignItemType> | null> {
  try {
    const response = await axiosInstanceWithAuth.post(
      `/api/v1/members/${id}/avatar/presign/`,
      data
    );

    return {
      data: response.data as SinglePresignItemType,
      status: "SUCCESS",
    };
  } catch {
    return null;
  }
}
