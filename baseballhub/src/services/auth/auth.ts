/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import axios from "axios";

export const login = async (username: string, password: string) => {
  try {
    const response = await axios.post(`/api/login/`, {
      username: username,
      password: password,
    });

    return {
      status: 200,
      data: response.data,
    };
  } catch (e: any) {
    return null;
  }
};

export const logout = async () => {
  try {
    const response = await axios.post(`/api/logout/`, {});

    return {
      status: 200,
      data: response.data,
    };
  } catch (e: any) {
    return null;
  }
};

export const refresh = async () => {
  try {
    const response = await axios.post(`/api/token/refresh/`, {});

    return {
      status: 200,
      data: response.data,
    };
  } catch (e: any) {
    return null;
  }
};
