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

export const getNoticeCategories = async () => {
  try {
    const response = await axios.get(`/api/notices/categories/`);

    return {
      status: 200,
      data: response.data,
    };
  } catch (e: any) {
    return null;
  }
};

export const createNotice = async (
  title: string,
  content: string,
  category_label: string,
  attachments: File[]
) => {
  const formData = new FormData();
  formData.append("title", title);
  formData.append("content", content);
  formData.append("category_label", category_label);
  attachments.forEach((attachment) => {
    formData.append("attachments", attachment);
  });

  try {
    const response = await axios.post(`/api/notices/`, formData, {
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
