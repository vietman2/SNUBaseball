/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import axios from "axios";

export const getFeedbacks = async () => {
  try {
    const response = await axios.get(`/api/feedbacks/`);

    return {
      status: 200,
      data: response.data,
    };
  } catch (e: any) {
    return null;
  }
};

export const getFeedbackDetail = async (id: number) => {
  try {
    const response = await axios.get(`/api/feedbacks/${id}/`);

    return {
      status: 200,
      data: response.data,
    };
  } catch (e: any) {
    return null;
  }
};
