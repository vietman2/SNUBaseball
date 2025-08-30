import { useQuery } from "@tanstack/react-query";

import { fetchMe } from "../api/me";
import { type UserProfileType } from "../models/user";

export function useMe(isAuthenticated: boolean) {
  return useQuery<UserProfileType, Error>({
    queryKey: ["me"],
    queryFn: fetchMe,
    enabled: isAuthenticated,
  });
}
