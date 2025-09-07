import { axiosInstance } from "@shared/lib/axios";

export async function logout(): Promise<void> {
  await axiosInstance.post("/api/v1/logout/");
}
