import axios from "axios";

import { BASE_URL } from "@shared/config/api";
import { ACCESS_TOKEN_KEY } from "@shared/config/tokens";

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
  timeout: 2000,
});

axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem(ACCESS_TOKEN_KEY);

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export { axiosInstance };

export type { APIErrorType, APIResponseType } from "./models/response";
