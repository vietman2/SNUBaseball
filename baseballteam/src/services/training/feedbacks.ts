import axios from "axios";

export const getFeedbacks = async (
  query?: string,
  category?: string | null,
  member?: number | null
) => {
  if (member === 0) member = null;

  try {
    const response = await axios.get(`/v1/feedbacks/`, {
      params: {
        query,
        category,
        player: member,
      },
    });

    return response.data;
  } catch {
    return null;
  }
};

export const getFeedbackDetail = async (id: number) => {
  try {
    const response = await axios.get(`/v1/feedbacks/${id}/`);

    return {
      status: 200,
      data: response.data,
    };
  } catch {
    return null;
  }
};

export const createFeedbackComment = async (id: number, content: string) => {
  try {
    const response = await axios.post(`/v1/feedbacks/${id}/comments/`, {
      content,
    });

    return response.data;
  } catch {
    return null;
  }
};

export const deleteFeedbackComment = async (
  feedbackId: number,
  commentId: number | undefined
) => {
  if (!commentId) return null;

  try {
    await axios.delete(`/v1/feedbacks/${feedbackId}/comments/${commentId}/`);

    return true;
  } catch {
    return null;
  }
};

export const editFeedbackComment = async (
  feedbackId: number,
  commentId: number | null,
  content: string
) => {
  try {
    const response = await axios.put(
      `/v1/feedbacks/${feedbackId}/comments/${commentId}/`,
      {
        content,
      }
    );

    return response.data;
  } catch {
    return null;
  }
};

export const deleteFeedback = async (id: number) => {
  try {
    await axios.delete(`/v1/feedbacks/${id}/`);

    return true;
  } catch {
    return null;
  }
};
