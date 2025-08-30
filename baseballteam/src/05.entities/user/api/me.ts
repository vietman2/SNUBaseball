import { type UserProfileType } from "../models/user";
import { axiosInstance } from "@shared/lib/axios";

export async function fetchMe(): Promise<UserProfileType> {
  const response = await axiosInstance.get<UserProfileType>("/api/me/");

  return response.data;
}
