import { useMutation, useQueryClient } from "@tanstack/react-query";

import type { NewMemberFormType } from "../models/form.types";
import type { MemberDetailsType } from "@entities/members";
import {
  axiosInstanceWithAuth,
  serverErrorMessageParser,
  type APIErrorType,
  type APIResponseType,
} from "@shared/lib/axios";

async function createNewMember(
  data: NewMemberFormType
): Promise<APIResponseType<MemberDetailsType> | APIErrorType> {
  try {
    const res = await axiosInstanceWithAuth.post<MemberDetailsType>(
      "/api/v1/members/",
      data
    );

    return {
      data: res.data,
      status: "SUCCESS",
    };
  } catch (error) {
    return serverErrorMessageParser(
      error,
      "새 멤버 추가에 실패했습니다. 잠시 후 다시 시도해주세요."
    );
  }
}

export function useCreateNewMemberAPI() {
  const queryClient = useQueryClient();

  return useMutation<
    APIResponseType<MemberDetailsType> | APIErrorType,
    unknown,
    NewMemberFormType
  >({
    mutationFn: (data) => createNewMember(data),
    onSuccess: (result) => {
      if (result.status === "SUCCESS") {
        queryClient.setQueryData<MemberDetailsType[]>(
          ["members"],
          (oldData) => {
            if (!oldData) return [result.data];
            return [...oldData, result.data];
          }
        );
      }
    },
  });
}
