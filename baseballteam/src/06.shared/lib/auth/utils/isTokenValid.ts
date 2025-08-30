import { jwtDecode } from "jwt-decode";

import { ACCESS_TOKEN_KEY } from "@shared/config/tokens";

type TokenPayloadType = {
  user_id: string;
  exp: number; // 토큰 만료 시간 (Unix timestamp)
  iat: number; // 토큰 발급 시간 (Unix timestamp)
  jti: string; // JWT ID
};

export function isTokenValid(): boolean {
  try {
    const token = localStorage.getItem(ACCESS_TOKEN_KEY);

    if (!token) return false;

    const decoded = jwtDecode<TokenPayloadType>(token);
    const currentTime = Math.floor(Date.now() / 1000); // 현재 시간을 Unix timestamp로 변환

    return decoded.exp > currentTime;
  } catch {
    return false;
  }
}
