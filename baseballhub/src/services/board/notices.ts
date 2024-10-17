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
  if (category_label === "") return null;

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

export const updateNotice = async (
  id: number,
  title: string,
  content: string,
  category_label: string,
  attachments: File[]
) => {
  if (category_label === "") return null;

  const formData = new FormData();
  formData.append("title", title);
  formData.append("content", content);
  formData.append("category_label", category_label);
  attachments.forEach((attachment) => {
    formData.append("attachments", attachment);
  });

  try {
    const response = await axios.put(`/api/notices/${id}/`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return {
      status: 200,
      data: response.data,
    };
  } catch (e: any) {
    return null;
  }
};

export const deleteNotice = async (id: number | undefined) => {
  if (id === undefined) return null;

  try {
    const response = await axios.delete(`/api/notices/${id}/`);

    return {
      status: 204,
      data: response.data,
    };
  } catch (e: any) {
    return null;
  }
};

export const createNoticeComment = async (
  noticeId: number | undefined,
  content: string
) => {
  if (noticeId === undefined || content === "") return null;

  try {
    const response = await axios.post(`/api/notices/${noticeId}/comments/`, {
      content,
    });

    return {
      status: 201,
      data: response.data,
    };
  } catch (e: any) {
    return null;
  }
};

export const editNoticeComment = async (
  noticeId: number | undefined,
  commentId: number | null,
  content: string
) => {
  if (noticeId === undefined || commentId === null || content === "")
    return null;

  try {
    const response = await axios.put(
      `/api/notices/${noticeId}/comments/${commentId}/`,
      {
        content,
      }
    );

    return {
      status: 200,
      data: response.data,
    };
  } catch (e: any) {
    return null;
  }
};

export const deleteNoticeComment = async (
  noticeId: number | undefined,
  commentId: number | undefined
) => {
  if (noticeId === undefined || commentId === undefined) return null;

  try {
    const response = await axios.delete(
      `/api/notices/${noticeId}/comments/${commentId}/`
    );

    return {
      status: 204,
      data: response.data,
    };
  } catch (e: any) {
    return null;
  }
};
