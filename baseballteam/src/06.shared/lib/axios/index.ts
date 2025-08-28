import axios from "axios";

import { BASE_URL } from "@shared/config/api";

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
  timeout: 2000,
});

export { axiosInstance };
