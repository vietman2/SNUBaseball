import { useQuery } from "@tanstack/react-query";

import type { MemberDetailsType } from "../models/member";
import { axiosInstanceWithAuth } from "@shared/lib/axios";

async function fetchMembersAPI(): Promise<MemberDetailsType[]> {
  const response = await axiosInstanceWithAuth.get<MemberDetailsType[]>(
    "/api/v1/members/"
  );

  return response.data;
}

export function useMembers() {
  return useQuery<MemberDetailsType[], Error>({
    queryKey: ["members"],
    queryFn: fetchMembersAPI,
  });
}
