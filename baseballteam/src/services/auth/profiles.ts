import axios from "axios";

export const getProfile = async (token: string) => {
  try {
    const uuid = localStorage.getItem("user_id");
    const response = await axios.get(`/v1/profiles/${uuid}/`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return {
      status: 200,
      data: response.data,
    };
  } catch {
    return null;
  }
};
