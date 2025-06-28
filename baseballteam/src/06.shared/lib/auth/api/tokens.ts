import { useMutation } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";

import type { TokenClaimResponseType } from "../models/response.types";
import type { APIErrorResponse } from "@shared/api";

async function refresh(): Promise<TokenClaimResponseType> {
  const response = await axios.post(`/api/tokens/refresh/`, {});

  return response.data;
}

export function useTokenRefresh() {
  return useMutation<
    TokenClaimResponseType,
    AxiosError<APIErrorResponse>,
    null
  >({
    mutationFn: () => refresh(),
  });
}
