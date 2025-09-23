import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

import type { UserProfileType } from "@entities/user";
import {
  axiosInstanceWithAuth,
  type APIErrorType,
  type APIResponseType,
} from "@shared/lib/axios";

type PresignResponseType = {
  url: string;
  fields: { [key: string]: string };
};

async function getPresignedUrl(
  id: number,
  file: File
): Promise<APIResponseType<PresignResponseType> | null> {
  try {
    const response = await axiosInstanceWithAuth.post(
      `/api/v1/members/${id}/avatar/presign/`,
      {
        filename: file.name,
        content_type: file.type,
        size: file.size,
      }
    );

    return {
      data: response.data as PresignResponseType,
      status: "SUCCESS",
    };
  } catch {
    return null;
  }
}

async function uploadToS3(
  presignedRes: PresignResponseType,
  file: File
): Promise<void> {
  const form = new FormData();
  Object.entries(presignedRes.fields).forEach(([k, v]) => {
    form.append(k, v);
  });
  form.append("file", file);
  form.append("Content-Type", file.type);

  await axios.post(presignedRes.url, form, {
    headers: {
      withCredentials: false,
    },
  });
}

type UploadResponseType = {
  url: string;
};

async function postUpload(
  id: number,
  key: string,
  originalFilename: string
): Promise<APIResponseType<UploadResponseType>> {
  const response = await axiosInstanceWithAuth.patch(
    `/api/v1/members/${id}/avatar/complete/`,
    {
      key,
      original_filename: originalFilename,
    }
  );

  return {
    data: response.data as UploadResponseType,
    status: "SUCCESS",
  };
}

async function updateProfileImage(
  id: number,
  file: File
): Promise<APIResponseType<UploadResponseType> | APIErrorType> {
  const pre = await getPresignedUrl(id, file);

  if (!pre) {
    return {
      status: "ERROR",
      message: "Presigned URL을 가져오는데 실패했습니다.",
    };
  }

  try {
    await uploadToS3(pre.data, file);
  } catch {
    return {
      status: "ERROR",
      message: "S3 업로드에 실패했습니다.",
    };
  }

  try {
    const done = await postUpload(id, pre.data.fields.key, file.name);

    return {
      data: done.data,
      status: "SUCCESS",
    };
  } catch {
    return {
      status: "ERROR",
      message: "업로드 완료 처리에 실패했습니다.",
    };
  }
}

export function useProfileImageMutation(id: number) {
  const queryClient = useQueryClient();

  return useMutation<
    APIResponseType<UploadResponseType> | APIErrorType,
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
