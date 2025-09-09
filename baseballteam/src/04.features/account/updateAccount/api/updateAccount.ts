import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

import type { MemberProfileType, UserProfileType } from "@entities/user";
import {
  axiosInstanceWithAuth,
  type APIErrorType,
  type APIResponseType,
} from "@shared/lib/axios";

type UpdateMajorDataType = {
  major_id: number;
};

type UpdateContactDataType = {
  phone: string;
  email: string;
  address: string;
};

async function updateAccount(
  id: number,
  data: UpdateMajorDataType | UpdateContactDataType
): Promise<APIResponseType<MemberProfileType> | APIErrorType> {
  try {
    const res = await axiosInstanceWithAuth.patch<MemberProfileType>(
      `/api/v1/profiles/${id}/`,
      data
    );

    return {
      data: res.data,
      status: "SUCCESS",
    };
  } catch (error) {
    if (axios.isAxiosError(error) && error.response?.data.message) {
      return {
        status: error.response.data.status,
        message: error.response.data.message,
      };
    }

    return {
      status: "ERROR",
      message: "프로필 업데이트에 실패했습니다. 잠시 후 다시 시도해주세요.",
    };
  }
}

export function useUpdateAccountMutation(id: number) {
  const queryClient = useQueryClient();

  return useMutation<
    APIResponseType<MemberProfileType> | APIErrorType,
    unknown,
    UpdateMajorDataType | UpdateContactDataType
  >({
    mutationFn: (data) => updateAccount(id, data),
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
