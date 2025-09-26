export type FileStatus = "PENDING" | "UPLOADING" | "DONE" | "ERROR";

export type UploadItem = {
  id: string;
  file: File;
  status: FileStatus;
  progress: number;
  errorMsg: string | null;
};

export type Action =
  | { type: "ADD"; items: UploadItem[] }
  | { type: "PROGRESS"; id: string; percent: number }
  | {
      type: "SET_STATUS";
      id: string;
      status: FileStatus;
      errorMsg?: string | null;
    }
  | { type: "REMOVE"; id: string }
  | { type: "CLEAR" };
