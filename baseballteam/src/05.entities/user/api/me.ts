import { type UserProfileType } from "../models/user";
import { axiosInstanceWithAuth } from "@shared/lib/axios";

export async function fetchMe(): Promise<UserProfileType> {
  const response = await axiosInstanceWithAuth.get<UserProfileType>(
    "/api/v1/me/"
  );

  return response.data;
}
