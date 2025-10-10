import axios from "axios";

import { BASE_URL } from "@shared/config/api";

export const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
    "X-SNUBASEBALL-CLIENT": "snu-baseball-team-portal",
  },
  withCredentials: true,
  timeout: 2000,
});

export const axiosInstanceWithAuth = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
    "X-SNUBASEBALL-CLIENT": "snu-baseball-team-portal",
  },
  withCredentials: true,
  timeout: 2000,
});
