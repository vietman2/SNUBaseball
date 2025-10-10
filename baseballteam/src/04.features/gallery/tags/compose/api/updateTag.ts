import { useMutation, useQueryClient } from "@tanstack/react-query";

import type { TagFormPayload } from "../models/payload";
import type { MediaTagType } from "@entities/gallery/tags";
import {
  axiosInstanceWithAuth,
  serverErrorMessageParser,
  type APIErrorType,
  type APIResponseType,
} from "@shared/lib/axios";

async function updateTag(
  tagId: number,
  data: TagFormPayload
): Promise<APIResponseType<MediaTagType> | APIErrorType> {
  try {
    const res = await axiosInstanceWithAuth.put<MediaTagType>(
      `/api/v1/gallery/tags/${tagId}/`,
      data
    );

    return {
      data: res.data,
      status: "SUCCESS",
    };
  } catch (error) {
    return serverErrorMessageParser(
      error,
      "태그 수정에 실패했습니다. 잠시 후 다시 시도해주세요."
    );
  }
}

export function useUpdateTagAPI(tagId: number) {
  const queryClient = useQueryClient();

  return useMutation<
    APIResponseType<MediaTagType> | APIErrorType,
    unknown,
    TagFormPayload
  >({
    mutationFn: (data) => updateTag(tagId, data),
    onSuccess: (result) => {
      if (result.status === "SUCCESS") {
        queryClient.setQueryData<MediaTagType[]>(["tags"], (oldData) => {
          if (!oldData) return [result.data];
          return oldData.map((tag) => (tag.id === tagId ? result.data : tag));
        });
      }
    },
  });
}
