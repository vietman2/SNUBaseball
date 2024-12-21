import axios from "axios";

export const getNotices = async (query?: string, category?: string | null) => {
  try {
    const response = await axios.get(`/v1/notices/`, {
      params: {
        query,
        category,
      },
    });

    return response.data;
  } catch {
    return null;
  }
};

export const getNoticeDetails = async (id: number) => {
  try {
    const response = await axios.get(`/v1/notices/${id}/`);

    return {
      status: 200,
      data: response.data,
    };
  } catch {
    return null;
  }
};

export const getNoticeCategories = async () => {
  try {
    const response = await axios.get(`/v1/notices/categories/`);

    return {
      status: 200,
      data: response.data,
    };
  } catch {
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
    const response = await axios.post(`/v1/notices/`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return {
      status: 201,
      data: response.data,
    };
  } catch {
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
    const response = await axios.put(`/v1/notices/${id}/`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
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

export const deleteNotice = async (id: number | undefined) => {
  if (id === undefined) return null;

  try {
    const response = await axios.delete(`/v1/notices/${id}/`);

    return {
      status: 204,
      data: response.data,
    };
  } catch {
    return null;
  }
};

export const likeNotice = async (id: number | undefined) => {
  if (id === undefined) return null;

  try {
    await axios.post(`/v1/notices/${id}/like/`);

    return true;
  } catch {
    return null;
  }
};

export const createNoticeComment = async (
  noticeId: number,
  content: string
) => {
  if (content === "") return null;

  try {
    await axios.post(`/v1/notices/${noticeId}/comments/`, {
      content,
    });

    return true;
  } catch {
    return null;
  }
};

export const editNoticeComment = async (
  noticeId: number,
  commentId: number | null,
  content: string
) => {
  if (!commentId || content === "") return null;

  try {
    await axios.put(`/v1/notices/${noticeId}/comments/${commentId}/`, {
      content,
    });

    return true;
  } catch {
    return null;
  }
};

export const deleteNoticeComment = async (
  noticeId: number,
  commentId: number
) => {
  try {
    await axios.delete(`/v1/notices/${noticeId}/comments/${commentId}/`);

    return true;
  } catch {
    return null;
  }
};
