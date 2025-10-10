import { useMutation, useQueryClient } from "@tanstack/react-query";

import {
  axiosInstanceWithAuth,
  serverErrorMessageParser,
  type APIErrorType,
  type APIResponseType,
} from "@shared/lib/axios";

async function deleteMedia(
  mediaId: number,
  type: "IMAGE" | "VIDEO"
): Promise<APIResponseType<null> | APIErrorType> {
  const url =
    type === "IMAGE"
      ? `/api/v1/gallery/images/${mediaId}/`
      : `/api/v1/gallery/videos/${mediaId}/`;

  try {
    const res = await axiosInstanceWithAuth.delete<null>(url);

    return {
      data: res.data,
      status: "SUCCESS",
    };
  } catch (error) {
    return serverErrorMessageParser(
      error,
      "미디어 삭제에 실패했습니다. 잠시 후 다시 시도해주세요."
    );
  }
}

export function useDeleteMediaAPI(mediaId: number, type: "IMAGE" | "VIDEO") {
  const queryClient = useQueryClient();

  return useMutation<APIResponseType<null> | APIErrorType, unknown, void>({
    mutationFn: () => deleteMedia(mediaId, type),
    onSuccess: (result) => {
      if (result.status === "SUCCESS") {
        queryClient.invalidateQueries({
          queryKey: ["media"],
        });
      }
    },
  });
}
