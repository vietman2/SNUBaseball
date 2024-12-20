import axios from "axios";

export const login = async (username: string, password: string) => {
  try {
    const response = await axios.post(`/v1/login/`, {
      username: username,
      password: password,
    });

    return {
      status: 200,
      data: response.data,
    };
  } catch {
    return null;
  }
};

export const logout = async () => {
  try {
    await axios.post(`/v1/logout/`, {});

    return true;
  } catch {
    return null;
  }
};

export const refresh = async () => {
  try {
    const response = await axios.post(`/v1/token/refresh/`, {});

    return {
      status: 200,
      data: response.data,
    };
  } catch {
    return null;
  }
};
