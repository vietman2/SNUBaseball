import axios from "axios";

export async function uploadFiles(
  files: File[],
  onProgress: (progress: number) => void
) {
  const formData = new FormData();
  files.forEach((file) => {
    formData.append("files", file);
  });

  try {
    await axios.post("/v1/archive/", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      onUploadProgress: (progressEvent) => {
        if (progressEvent.total) {
          const percentCompleted = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          );
          onProgress(percentCompleted);
        }
      },
    });

    return true;
  } catch {
    return null;
  }
}
