import { useMutation } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";

import type { SignupFormType } from "../models/form.types";
import { type APIErrorResponse, showErrorAlert } from "@shared/api";

export async function signup(data: SignupFormType): Promise<void> {
  await axios.post("/api/login/", data);
}

export function useSignup() {
  return useMutation<void, AxiosError<APIErrorResponse>, SignupFormType>({
    mutationFn: (data) => signup(data),
    onError: (e) => {
      showErrorAlert(e, "회원가입에 실패했습니다. 다시 시도해주세요.");
    },
  });
}
