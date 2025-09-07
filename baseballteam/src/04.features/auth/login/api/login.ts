import { isAxiosError } from "axios";

import {
  type APIResponseType,
  type APIErrorType,
  axiosInstance,
} from "@shared/lib/axios";

type LoginResponseType = {
  access: string;
};

export async function login(data: {
  username: string;
  password: string;
}): Promise<APIResponseType<LoginResponseType> | APIErrorType> {
  try {
    const res = await axiosInstance.post("/api/v1/login/", data);

    return {
      status: "SUCCESS",
      data: res.data as LoginResponseType,
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
