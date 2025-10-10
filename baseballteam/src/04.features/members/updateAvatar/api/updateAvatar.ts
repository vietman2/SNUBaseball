import { useMutation, useQueryClient } from "@tanstack/react-query";

import { postUpload } from "./completeUpload";
import { getPresignedUrl } from "./presign";
import type { AvatarUploadResultType } from "../models/response";
import type { UserProfileType } from "@entities/user";
import { type APIErrorType, type APIResponseType } from "@shared/lib/axios";
import { toPresignRequestFile, uploadToS3 } from "@shared/lib/storage";

async function updateProfileImage(
  id: number,
  file: File
): Promise<APIResponseType<AvatarUploadResultType> | APIErrorType> {
  const pre = await getPresignedUrl(id, toPresignRequestFile(file));

  if (!pre) {
    return {
      status: "ERROR",
      message: "Presigned URL을 가져오는데 실패했습니다.",
    };
  }

  try {
    await uploadToS3({ url: pre.data.url, fields: pre.data.fields, file });
  } catch {
    return {
      status: "ERROR",
      message: "S3 업로드에 실패했습니다.",
    };
  }

  const done = await postUpload(id, pre.data.fields.key, file.name);

  if (!done) {
    return {
      status: "ERROR",
      message: "업로드 완료 처리에 실패했습니다.",
    };
  }

  return {
    data: done.data,
    status: "SUCCESS",
  };
}

export function useProfileImageMutation(id: number) {
  const queryClient = useQueryClient();

  return useMutation<
    APIResponseType<AvatarUploadResultType> | APIErrorType,
    unknown,
    File
  >({
    mutationFn: (file) => updateProfileImage(id, file),
    onSuccess: (result) => {
      queryClient.setQueryData<UserProfileType>(["me"], (oldData) => {
        if (result.status !== "SUCCESS") return oldData;

        if (!oldData) return oldData;

        return {
          ...oldData,
          member: {
            ...oldData.member,
            profile_image: result.data.url,
          },
        };
      });
    },
  });
}
