import { useMutation, useQueryClient } from "@tanstack/react-query";

import type { MemberDetailsType } from "../models/member";
import type { UserProfileType } from "@entities/user/@x/member";
import {
  axiosInstanceWithAuth,
  serverErrorMessageParser,
  type APIErrorType,
  type APIResponseType,
} from "@shared/lib/axios";

async function updateMember<T>(
  memberId: number,
  data: T
): Promise<APIResponseType<MemberDetailsType> | APIErrorType> {
  try {
    const res = await axiosInstanceWithAuth.patch<MemberDetailsType>(
      `/api/v1/members/${memberId}/`,
      data
    );

    return {
      data: res.data,
      status: "SUCCESS",
    };
  } catch (error) {
    return serverErrorMessageParser(
      error,
      "프로필 업데이트에 실패했습니다. 잠시 후 다시 시도해주세요."
    );
  }
}

export function useUpdateMemberAPI<T>(memberId: number) {
  const queryClient = useQueryClient();

  return useMutation<
    APIResponseType<MemberDetailsType> | APIErrorType,
    unknown,
    T
  >({
    mutationFn: (data) => updateMember(memberId, data),
    onSuccess: (result) => {
      if (result.status === "SUCCESS") {
        queryClient.setQueryData<UserProfileType>(["me"], (oldData) => {
          if (!oldData) return oldData;
          return {
            ...oldData,
            member: result.data,
          };
        });
      }
    },
  });
}
