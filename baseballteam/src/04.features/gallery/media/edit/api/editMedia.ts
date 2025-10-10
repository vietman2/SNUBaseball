import { useMutation, useQueryClient } from "@tanstack/react-query";

import type { EditMediaPayload } from "../models/request";
import type { MediaType } from "@entities/gallery/media";
import {
  axiosInstanceWithAuth,
  serverErrorMessageParser,
  type APIErrorType,
  type APIResponseType,
} from "@shared/lib/axios";

async function editMedia(
  mediaId: number,
  type: "IMAGE" | "VIDEO",
  payload: EditMediaPayload
): Promise<APIResponseType<MediaType> | APIErrorType> {
  try {
    const endpoint =
      type === "IMAGE"
        ? `/api/v1/gallery/images/${mediaId}/`
        : `/api/v1/gallery/videos/${mediaId}/`;

    const res = await axiosInstanceWithAuth.patch<MediaType>(endpoint, payload);

    return {
      data: res.data,
      status: "SUCCESS",
    };
  } catch (error) {
    return serverErrorMessageParser(
      error,
      "미디어 수정에 실패했습니다. 잠시 후 다시 시도해주세요."
    );
  }
}

export function useEditMediaAPI(mediaId: number, type: "IMAGE" | "VIDEO") {
  const queryClient = useQueryClient();

  return useMutation<
    APIResponseType<MediaType> | APIErrorType,
    unknown,
    EditMediaPayload
  >({
    mutationFn: (payload) => editMedia(mediaId, type, payload),
    onSuccess: (result) => {
      if (result.status === "SUCCESS") {
        queryClient.invalidateQueries({
          queryKey: ["media"],
        });
      }
    },
  });
}
