import { useMutation, useQueryClient } from "@tanstack/react-query";

import type { AlbumType } from "@entities/gallery/album";
import {
  axiosInstanceWithAuth,
  serverErrorMessageParser,
  type APIErrorType,
  type APIResponseType,
} from "@shared/lib/axios";

async function deleteAlbum(
  albumTitle: string
): Promise<APIResponseType<null> | APIErrorType> {
  try {
    const res = await axiosInstanceWithAuth.delete<null>(
      `/api/v1/gallery/albums/${albumTitle}/`
    );

    return {
      data: res.data,
      status: "SUCCESS",
    };
  } catch (error) {
    return serverErrorMessageParser(
      error,
      "앨범 삭제에 실패했습니다. 잠시 후 다시 시도해주세요."
    );
  }
}

export function useDeleteAlbumAPI(albumTitle: string) {
  const queryClient = useQueryClient();

  return useMutation<APIResponseType<null> | APIErrorType, unknown, void>({
    mutationFn: () => deleteAlbum(albumTitle),
    onSuccess: (result) => {
      if (result.status === "SUCCESS") {
        queryClient.setQueryData<AlbumType[]>(["albums"], (oldData) => {
          if (!oldData) return [];
          return oldData.filter((album) => album.title !== albumTitle);
        });
      }
    },
  });
}
