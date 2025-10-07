export type FileStatus = "PENDING" | "UPLOADING" | "DONE" | "ERROR";

export type UploadItem = {
  id: string;
  file: File;
  status: FileStatus;
  progress: number;
  errorMsg: string | null;
};

export const sampleUploadItem: UploadItem = {
  id: "1",
  file: new File(["dummy content"], "example.png", { type: "image/png" }),
  status: "PENDING",
  progress: 0,
  errorMsg: null,
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
