import { isAxiosError } from "axios";

import type { StudentIdCheckSuccessType } from "../models/response";
import {
  axiosInstance,
  type APIErrorType,
  type APIResponseType,
} from "@shared/lib/axios";

export async function checkStudentId(data: {
  student_id: string;
}): Promise<APIResponseType<StudentIdCheckSuccessType> | APIErrorType> {
  try {
    const res = await axiosInstance.post("/api/v1/register/sid/", data);

    return {
      status: "SUCCESS",
      data: res.data as StudentIdCheckSuccessType,
    };
  } catch (error: unknown) {
    if (isAxiosError(error) && error.response) {
      const backendError = error.response.data as APIErrorType;

      return {
        status: backendError.status,
        message: backendError.message,
      };
    } else {
      return {
        status: "ERROR",
        message: "알 수 없는 에러가 발생했습니다.",
      };
    }
  }
}
