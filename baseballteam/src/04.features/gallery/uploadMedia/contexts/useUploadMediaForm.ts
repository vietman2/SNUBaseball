import { createContext, useContext } from "react";

import type { UploadItem } from "@shared/lib/files";

interface UploadMediaFormContext {
  fileObjs: UploadItem[];
  addFiles: (list: FileList | null) => void;
  removeFile: (id: string) => void;
  submit: () => void;
  isReady: boolean;
  progress: number;
}

export const UploadMediaFormContext =
  createContext<UploadMediaFormContext | null>(null);

export function useUploadMediaForm() {
  const context = useContext(UploadMediaFormContext);
  if (!context) {
    throw new Error(
      "useUploadMediaForm must be used within an UploadMediaFormProvider"
    );
  }
  return context;
}
