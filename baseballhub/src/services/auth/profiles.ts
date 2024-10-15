/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import axios from "axios";

export const getProfile = async () => {
  try {
    const uuid = localStorage.getItem("user_id");
    const response = await axios.get(`/api/profiles/${uuid}/`);

    return {
      status: 200,
      data: response.data,
    };
  } catch (e: any) {
    return null;
  }
};
