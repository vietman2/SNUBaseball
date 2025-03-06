import { createContext, useContext, useMemo, useState } from "react";

import { uploadFiles } from "@services/archive";

interface FileContextType {
  uploadedFiles: File[];
  progress: number;
  dropFiles: (files: FileList | null) => void;
  removeFile: (file: File) => void;
  submitFiles: () => Promise<boolean>;
}

const FilesContext = createContext<FileContextType | undefined>(undefined);

export function FilesProvider({ children }: { children: React.ReactNode }) {
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [progress, setProgress] = useState<number>(0);

  const dropFiles = (files: FileList | null) => {
    if (!files) return;

    const newFiles = Array.from(files);
    setUploadedFiles((prev) => [...prev, ...newFiles]);
  };

  const removeFile = (file: File) => {
    setUploadedFiles((prev) => prev.filter((f) => f !== file));
  };

  const uploadFilesToServer = async () => {
    const response = await uploadFiles(uploadedFiles, (progress) => {
      setProgress(progress);
    });

    if (response) {
      setUploadedFiles([]);
      setProgress(0);
      return true;
    } else {
      alert("업로드에 실패했습니다.");
      setProgress(0);
      return false;
    }
  };

  const value = useMemo(
    () => ({
      uploadedFiles,
      progress,
      dropFiles,
      removeFile,
      submitFiles: uploadFilesToServer,
    }),
    [uploadedFiles, progress]
  );

  return (
    <FilesContext.Provider value={value}>{children}</FilesContext.Provider>
  );
}

export const useFiles = () => {
  const context = useContext(FilesContext);

  if (!context) {
    throw new Error("useGallery must be used within a GalleryProvider");
  }

  return context;
};
