import axios from "axios";

type SingleS3UploadItemType = {
  url: string;
  fields: Record<string, string>;
  file: File;
  onProgress?: (percent: number) => void;
};

export async function uploadToS3(data: SingleS3UploadItemType): Promise<void> {
  const form = new FormData();
  Object.entries(data.fields).forEach(([k, v]) => {
    form.append(k, v);
  });
  form.append("file", data.file);

  await axios.post(data.url, form, {
    withCredentials: false,
    headers: {
      "Content-Type": "multipart/form-data",
    },
    onUploadProgress: (e) => {
      if (!data.onProgress || !e.total) return;
      data.onProgress(Math.round((e.loaded / e.total) * 100));
    },
  });
}
