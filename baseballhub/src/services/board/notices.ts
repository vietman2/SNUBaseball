/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import axios from "axios";

export const getNotices = async () => {
  try {
    const response = await axios.get(`/api/notices/`);

    return {
      status: 200,
      data: response.data,
    };
  } catch (e: any) {
    return null;
  }
};

export const getNoticeDetails = async (id: number) => {
  try {
    const response = await axios.get(`/api/notices/${id}/`);

    return {
      status: 200,
      data: response.data,
    };
  } catch (e: any) {
    return null;
  }
};
