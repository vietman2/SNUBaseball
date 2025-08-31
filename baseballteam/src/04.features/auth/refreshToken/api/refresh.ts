import { type APIResponseType, axiosInstance } from "@shared/lib/axios";

type RefreshResponseType = {
  access: string;
};

export async function refreshToken(): Promise<APIResponseType<RefreshResponseType> | null> {
  try {
    const res = await axiosInstance.post("/api/v1/tokens/refresh/");

    return {
      status: "SUCCESS",
      data: res.data as RefreshResponseType,
    };
  } catch {
    return null;
  }
}
