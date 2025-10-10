import { useMutation, useQueryClient } from "@tanstack/react-query";

import type { AlbumFormPayload } from "../models/payload";
import type { AlbumType } from "@entities/gallery/album";
import {
  axiosInstanceWithAuth,
  serverErrorMessageParser,
  type APIErrorType,
  type APIResponseType,
} from "@shared/lib/axios";

async function updateAlbum(
  albumTitle: string,
  data: AlbumFormPayload
): Promise<APIResponseType<AlbumType> | APIErrorType> {
  try {
    const res = await axiosInstanceWithAuth.put<AlbumType>(
      `/api/v1/gallery/albums/${albumTitle}/`,
      data
    );

    return {
      data: res.data,
      status: "SUCCESS",
    };
  } catch (error) {
    return serverErrorMessageParser(
      error,
      "앨범 수정에 실패했습니다. 잠시 후 다시 시도해주세요."
    );
  }
}

export function useUpdateAlbumAPI(albumTitle: string) {
  const queryClient = useQueryClient();

  return useMutation<
    APIResponseType<AlbumType> | APIErrorType,
    unknown,
    AlbumFormPayload
  >({
    mutationFn: (data) => updateAlbum(albumTitle, data),
    onSuccess: (result) => {
      if (result.status === "SUCCESS") {
        queryClient.setQueryData<AlbumType[]>(["albums"], (oldData) => {
          if (!oldData) return [result.data];
          return oldData.map((album) =>
            album.title === albumTitle ? result.data : album
          );
        });
      }
    },
  });
}
