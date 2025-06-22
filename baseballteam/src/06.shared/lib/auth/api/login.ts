import { useMutation } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";

import type { LoginFormType } from "../models/form.types";
import type { TokenClaimResponseType } from "../models/response.types";
import { type APIErrorResponse } from "@shared/api";

async function login(data: LoginFormType): Promise<TokenClaimResponseType> {
  const res = await axios.post("/api/v1/login/", data);

  return res.data;
}

export function useLogin() {
  return useMutation<
    TokenClaimResponseType,
    AxiosError<APIErrorResponse>,
    LoginFormType
  >({
    mutationFn: (data) => login(data),
  });
}
