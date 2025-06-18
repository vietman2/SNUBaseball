import axios from "axios";

import type { TokenRefreshResponseType } from "../models/types";

export async function refresh(): Promise<TokenRefreshResponseType> {
  const response = await axios.post(`/api/v1/tokens/refresh/`, {});

  return response.data;
}
