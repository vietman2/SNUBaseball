import { useMutation, useQueryClient } from "@tanstack/react-query";

import type { MediaTagType } from "@entities/gallery/tags";
import {
  axiosInstanceWithAuth,
  serverErrorMessageParser,
  type APIErrorType,
  type APIResponseType,
} from "@shared/lib/axios";

async function deleteTag(
  tagId: number
): Promise<APIResponseType<null> | APIErrorType> {
  try {
    const res = await axiosInstanceWithAuth.delete<null>(
      `/api/v1/gallery/tags/${tagId}/`
    );

    return {
      data: res.data,
      status: "SUCCESS",
    };
  } catch (error) {
    return serverErrorMessageParser(
      error,
      "태그 삭제에 실패했습니다. 잠시 후 다시 시도해주세요."
    );
  }
}

export function useDeleteTagAPI() {
  const queryClient = useQueryClient();

  return useMutation<APIResponseType<null> | APIErrorType, unknown, number>({
    mutationFn: (tagId) => deleteTag(tagId),
    onSuccess: (result, tagId) => {
      if (result.status === "SUCCESS") {
        queryClient.setQueryData<MediaTagType[]>(["tags"], (oldData) => {
          if (!oldData) return [];
          return oldData.filter((tag) => tag.id !== tagId);
        });
      }
    },
  });
}
