import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

import type { MemberDetailType } from "@entities/members";
import {
  axiosInstanceWithAuth,
  type APIErrorType,
  type APIResponseType,
} from "@shared/lib/axios";

type UpdateBasicProfileDataType = {
  back_number: number | null;
  birth_date: string | null;
  date_joined: string | null;
  num_semester: number;
};

type UpdateExtrasDataType = {
  extras: {
    position: string | null;
    bat_throw_hands: string | null;
    height: number | null;
    weight: number | null;
  };
};

async function updateProfile(
  id: number,
  data: UpdateBasicProfileDataType | UpdateExtrasDataType
): Promise<APIResponseType<MemberDetailType> | APIErrorType> {
  try {
    const response = await axiosInstanceWithAuth.patch<MemberDetailType>(
      `/api/v1/members/${id}/`,
      data
    );

    return {
      data: response.data,
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

export function useUpdateProfileMutation(id: number) {
  const queryClient = useQueryClient();

  return useMutation<
    APIResponseType<MemberDetailType> | APIErrorType,
    unknown,
    UpdateBasicProfileDataType | UpdateExtrasDataType
  >({
    mutationFn: (data) => updateProfile(id, data),
    onSuccess: (result) => {
      if (result.status === "SUCCESS") {
        queryClient.setQueryData(["member-profile", id], result.data);
      }
    },
  });
}
