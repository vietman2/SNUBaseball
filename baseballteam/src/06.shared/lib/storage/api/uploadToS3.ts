import axios, { AxiosError } from "axios";

import type { PresignItemType, S3UploadResult, S3UploadErr, S3UploadOk } from "../models/response.types";

type ProgressCb = (info: {
  index: number;
  filename: string;
  percent: number;
}) => void;

export async function uploadToS3(
  url: string,
  fields: Record<string, string>,
  file: File,
  onProgress?: (percent: number) => void
): Promise<void> {
  const form = new FormData();
  Object.entries(fields).forEach(([k, v]) => {
    form.append(k, v);
  });
  form.append("file", file);


  await axios.post(url, form, {
    withCredentials: false,
    headers: {
      "Content-Type": "multipart/form-data",
    },
    onUploadProgress: (e) => {
      if (!onProgress || !e.total) return;
      onProgress(Math.round((e.loaded / e.total) * 100));
    },
  });
}
