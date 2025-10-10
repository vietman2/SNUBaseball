import { createContext, useContext } from "react";

import type { UploadItem } from "../models/types";

interface FileSelectContext {
  // 파일 선택 관련
  fileObjs: UploadItem[];
  addFiles: (list: FileList | null) => void;
  removeFile: (id: string) => void;

  // 파일 상태 관련
  setError: (id: string, msg: string) => void;
  setDone: (id: string) => void;
  setProgress: (id: string, progress: number) => void;

  // 전체 진행률
  overallProgress: number;

  // 초기화
  clear: () => void;
}

export const FileSelectContext = createContext<FileSelectContext | null>(null);

export function useFileSelect() {
  const context = useContext(FileSelectContext);
  if (!context) {
    throw new Error("useFileSelect must be used within a FileSelectProvider");
  }
  return context;
}
