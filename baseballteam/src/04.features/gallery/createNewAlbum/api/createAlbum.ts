import { useMutation, useQueryClient } from "@tanstack/react-query";

import type { AlbumType, GalleryDataResponseType } from "@entities/gallery";
import {
  axiosInstanceWithAuth,
  serverErrorMessageParser,
  type APIErrorType,
  type APIResponseType,
} from "@shared/lib/axios";

type NewAlbumFormType = {
  title: string;
  members_only: boolean;
};

async function createAlbum(
  data: NewAlbumFormType
): Promise<APIResponseType<AlbumType> | APIErrorType> {
  try {
    const res = await axiosInstanceWithAuth.post<AlbumType>(
      "/api/v1/gallery/albums/",
      data
    );

    return {
      data: res.data,
      status: "SUCCESS",
    };
  } catch (error) {
    return serverErrorMessageParser(
      error,
      "새 앨범 생성에 실패했습니다. 잠시 후 다시 시도해주세요."
    );
  }
}

export function useCreateAlbumAPI() {
  const queryClient = useQueryClient();

  return useMutation<
    APIResponseType<AlbumType> | APIErrorType,
    unknown,
    NewAlbumFormType
  >({
    mutationFn: (data) => createAlbum(data),
    onSuccess: (result) => {
      if (result.status === "SUCCESS") {
        queryClient.setQueryData<GalleryDataResponseType>(
          ["gallery"],
          (oldData) => {
            if (!oldData)
              return {
                albums: [result.data],
                tags: [],
              };
            return {
              ...oldData,
              albums: [result.data, ...oldData.albums],
            };
          }
        );
      }
    },
  });
}
