import { isAxiosError } from "axios";

import type { SignupFormType } from "../models/forms";
import {
  axiosInstance,
  type APIErrorType,
  type APIResponseType,
} from "@shared/lib/axios";

export async function signup(
  data: SignupFormType
): Promise<APIResponseType<void> | APIErrorType> {
  try {
    await axiosInstance.post("/api/v1/register/", data);

    return {
      status: "SUCCESS",
      data: undefined,
    };
  } catch (error: unknown) {
    if (isAxiosError(error) && error.response?.data.message) {
      return {
        status: error.response.data.status,
        message: error.response.data.message,
      };
    }
    return {
      status: "ERROR",
      message: "알 수 없는 오류가 발생했습니다.",
    };
  }
}
