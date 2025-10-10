import type { RequestItemType } from "../models/request";
import { axiosInstanceWithAuth, type APIResponseType } from "@shared/lib/axios";
import {
  toPresignRequestFile,
  uploadToS3,
  type PresignItemType,
  type PresignRequestType,
} from "@shared/lib/storage";

async function getPresignedUrl(
  albumID: number,
  data: PresignRequestType
): Promise<APIResponseType<PresignItemType> | null> {
  try {
    const response = await axiosInstanceWithAuth.post(
      `/api/v1/gallery/albums/${albumID}/upload/presign/`,
      data
    );

    return {
      data: response.data as PresignItemType,
      status: "SUCCESS",
    };
  } catch {
    return null;
  }
}

export async function uploadSingleMedia(
  albumID: number,
  file: File,
  onProgress: (p: number) => void
): Promise<APIResponseType<RequestItemType> | null> {
  const presignedURL = await getPresignedUrl(
    albumID,
    toPresignRequestFile(file)
  );

  if (!presignedURL) {
    onProgress(0);
    return null;
  }

  // presign이 성공하면, 대략 10% 성공했다고 간주
  onProgress(10);

  try {
    await uploadToS3({
      url: presignedURL.data.url,
      fields: presignedURL.data.fields,
      file: file,
      onProgress: (p) => {
        // 10~90% 구간으로 스케일
        const scaled = 10 + (p * 80) / 100;
        onProgress(Math.min(90, Math.max(10, Math.round(scaled))));
      }, // s3 업로드가 끝나면 90% 완료했다고 간주
    });

    onProgress(90);

    return {
      status: "SUCCESS",
      data: {
        key: presignedURL.data.fields.key,
        original_filename: file.name,
      },
    };
  } catch {
    onProgress(0);
    return null;
  }
}
