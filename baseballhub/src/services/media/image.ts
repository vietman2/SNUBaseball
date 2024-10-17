/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import axios from "axios";

export const uploadImage = async (file: File, path?: string) => {
  try {
    const formData = new FormData();
    formData.append("image", file);
    if (path) formData.append("path", path);

    const response = await axios.post(`/api/images/`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return {
      status: 201,
      data: response.data,
    };
  } catch (e: any) {
    return null;
  }
};
