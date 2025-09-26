export type S3UploadOk = { filename: string; key: string };
export type S3UploadErr = { filename: string; key?: string; message: string };

export type S3UploadResult = {
  ok: S3UploadOk[];
  errors: S3UploadErr[];
};
