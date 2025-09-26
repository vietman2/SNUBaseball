export type PresignItemType = {
  index: number; // 요청한 파일의 인덱스
  filename: string;
  key: string; // 업로드 완료 시 서버에 넘길 key
  post: {
    url: string;
    fields: Record<string, string>;
  };
};

type PresignErrorType = {
  index: number;
  filename: string;
  message: string;
};

export type PresignResponseType = {
  items: PresignItemType[];
  errors: PresignErrorType[];
};

export type S3UploadOk = { filename: string; key: string };
export type S3UploadErr = { filename: string; key?: string; message: string };

export type S3UploadResult = {
  ok: S3UploadOk[];
  errors: S3UploadErr[];
};
