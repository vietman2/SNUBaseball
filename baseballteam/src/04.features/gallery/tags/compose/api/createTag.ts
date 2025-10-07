import { useMutation, useQueryClient } from "@tanstack/react-query";

import type { TagFormPayload } from "../models/payload";
import type { MediaTagType } from "@entities/gallery/tags";
import {
  axiosInstanceWithAuth,
  serverErrorMessageParser,
  type APIErrorType,
  type APIResponseType,
} from "@shared/lib/axios";

async function createTag(
  data: TagFormPayload
): Promise<APIResponseType<MediaTagType> | APIErrorType> {
  try {
    const res = await axiosInstanceWithAuth.post<MediaTagType>(
      "/api/v1/gallery/tags/",
      data
    );

    return {
      data: res.data,
      status: "SUCCESS",
    };
  } catch (error) {
    return serverErrorMessageParser(
      error,
      "새 태그 생성에 실패했습니다. 잠시 후 다시 시도해주세요."
    );
  }
}

export function useCreateTagAPI() {
  const queryClient = useQueryClient();

  return useMutation<
    APIResponseType<MediaTagType> | APIErrorType,
    unknown,
    TagFormPayload
  >({
    mutationFn: (data) => createTag(data),
    onSuccess: (result) => {
      if (result.status === "SUCCESS") {
        queryClient.setQueryData<MediaTagType[]>(["tags"], (oldData) => {
          if (!oldData) return [result.data];
          return [...oldData, result.data];
        });
      }
    },
  });
}
