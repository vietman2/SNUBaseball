import type { Action, UploadItem } from "../models/types";

export function uploadReducer(
  state: UploadItem[],
  action: Action
): UploadItem[] {
  switch (action.type) {
    case "ADD":
      return [...state, ...action.items];
    case "PROGRESS":
      return state.map((it) =>
        it.id === action.id
          ? { ...it, status: "UPLOADING", progress: action.percent }
          : it
      );
    case "SET_STATUS":
      return state.map((it) =>
        it.id === action.id
          ? {
              ...it,
              status: action.status,
              errorMsg:
                action.status === "ERROR"
                  ? action.errorMsg ?? "업로드에 실패했습니다."
                  : null,
            }
          : it
      );
    case "REMOVE":
      return state.filter((it) => it.id !== action.id);
    case "CLEAR":
      return [];
    default:
      return state;
  }
}
