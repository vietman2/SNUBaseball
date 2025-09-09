import { useQuery } from "@tanstack/react-query";

import type { MemberDetailType } from "../models/member";
import { axiosInstance } from "@shared/lib/axios";

async function fetchMemberDetailsAPI(id: number): Promise<MemberDetailType> {
  const response = await axiosInstance.get<MemberDetailType>(
    `/api/v1/members/${id}/`
  );

  return response.data;
}

export function useMemberDetails(id: number) {
  return useQuery<MemberDetailType, Error>({
    queryKey: ["member-profile", id],
    queryFn: () => fetchMemberDetailsAPI(id),
  });
}
