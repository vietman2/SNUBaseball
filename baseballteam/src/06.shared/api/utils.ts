/* eslint-disable @typescript-eslint/no-explicit-any */

import { type AxiosError, isAxiosError } from "axios";
import type { APIErrorResponse } from "./types";

export function showErrorAlert(
  e: AxiosError<APIErrorResponse, any>,
  fallbackMessage?: string
) {
  if (isAxiosError(e) && e.response?.data.error) {
    window.alert(e.response.data.error);
  } else {
    window.alert(fallbackMessage ?? "오류가 발생했습니다. 다시 시도해주세요.");
  }
}
