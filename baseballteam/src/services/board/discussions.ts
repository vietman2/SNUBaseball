import axios from "axios";

export const getDiscussions = async (query?: string) => {
  try {
    const response = await axios.get(`/v1/discussions/`, {
      params: query && {
        query,
      },
    });

    return response.data;
  } catch {
    return null;
  }
};

export const getDiscussionDetails = async (id: number) => {
  try {
    const response = await axios.get(`/v1/discussions/${id}/`);

    return response.data;
  } catch {
    return null;
  }
};

export const createDiscussion = async (
  title: string,
  content: string,
  attachments: File[]
) => {
  const formData = new FormData();
  formData.append("title", title);
  formData.append("content", content);
  attachments.forEach((attachment) => {
    formData.append("attachments", attachment);
  });

  try {
    const response = await axios.post(`/v1/discussions/`, formData, {
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

export const updateDiscussion = async (
  id: number,
  title: string,
  content: string,
  attachments: File[]
) => {
  const formData = new FormData();
  formData.append("title", title);
  formData.append("content", content);
  attachments.forEach((attachment) => {
    formData.append("attachments", attachment);
  });

  try {
    const response = await axios.put(`/v1/discussions/${id}/`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return response.data;
  } catch {
    return null;
  }
};

export const deleteDiscussion = async (id: number | undefined) => {
  if (!id) return null;

  try {
    await axios.delete(`/v1/discussions/${id}/`);

    return true;
  } catch {
    return null;
  }
};

export const likeDiscussion = async (id: number | undefined) => {
  if (!id) return null;

  try {
    await axios.post(`/v1/discussions/${id}/like/`);

    return true;
  } catch {
    return null;
  }
};

export const createDiscussionComment = async (
  discussionId: number,
  content: string
) => {
  try {
    const response = await axios.post(
      `/v1/discussions/${discussionId}/comments/`,
      {
        content,
      }
    );

    return response.data;
  } catch {
    return null;
  }
};

export const editDiscussionComment = async (
  discussionId: number,
  commentId: number | null,
  content: string
) => {
  try {
    const response = await axios.put(
      `/v1/discussions/${discussionId}/comments/${commentId}/`,
      {
        content,
      }
    );

    return response.data;
  } catch {
    return null;
  }
};

export const deleteDiscussionComment = async (
  discussionId: number,
  commentId: number
) => {
  try {
    await axios.delete(
      `/v1/discussions/${discussionId}/comments/${commentId}/`
    );

    return true;
  } catch {
    return null;
  }
};
