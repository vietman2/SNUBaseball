import axios from "axios";

export const getGuidelines = async (category: string, filter: string) => {
  try {
    const response = await axios.get(`/v1/guidelines/`, {
      params: {
        category,
        filter,
      },
    });

    return response.data;
  } catch {
    return null;
  }
};

export const getGuidelinesDetail = async (guidelineId: number) => {
  try {
    const response = await axios.get(`/v1/guidelines/${guidelineId}/`);

    return response.data;
  } catch {
    return null;
  }
};

export const createGuideline = async (
  title: string,
  content: string,
  videoLink: string,
  subcategory: string,
  isDrill: boolean,
  indoor: boolean,
  minPlayers: number,
  maxPlayers: number
) => {
  const data = {
    title,
    content,
    url: videoLink,
    category: subcategory,
    is_drill: isDrill,
    is_indoor: indoor,
    min_people: minPlayers,
    max_people: maxPlayers,
  };

  try {
    const response = await axios.post(`/v1/guidelines/`, data);

    return response.data;
  } catch {
    return null;
  }
};

export const editGuideline = async (
  guidelineId: number,
  title: string,
  content: string,
  videoLink: string,
  subcategory: string,
  isDrill: boolean,
  indoor: boolean,
  minPlayers: number,
  maxPlayers: number
) => {
  const data = {
    title,
    content,
    video_id: videoLink,
    category: subcategory,
    is_drill: isDrill,
    is_indoor: indoor,
    min_people: minPlayers,
    max_people: maxPlayers,
  };

  try {
    const response = await axios.put(`/v1/guidelines/${guidelineId}/`, data);

    return response.data;
  } catch {
    return null;
  }
};

export const deleteGuideline = async (guidelineId: number | undefined) => {
  if (!guidelineId) return null;

  try {
    await axios.delete(`/v1/guidelines/${guidelineId}/`);

    return true;
  } catch {
    return null;
  }
};

export const likeGuideline = async (guidelineId: number | undefined) => {
  if (!guidelineId) return null;

  try {
    await axios.post(`/v1/guidelines/${guidelineId}/like/`);

    return true;
  } catch {
    return null;
  }
};

export const createGuidelineComment = async (
  guidelineId: number,
  content: string
) => {
  if (content === "") return null;

  try {
    await axios.post(`/v1/guidelines/${guidelineId}/comments/`, {
      content,
    });

    return true;
  } catch {
    return null;
  }
};

export const editGuidelineComment = async (
  guidelineId: number,
  commentId: number | null,
  content: string
) => {
  if (!commentId || content === "") return null;

  try {
    await axios.put(`/v1/guidelines/${guidelineId}/comments/${commentId}/`, {
      content,
    });

    return true;
  } catch {
    return null;
  }
};

export const deleteGuidelineComment = async (
  guidelineId: number,
  commentId: number | undefined
) => {
  if (!commentId) return null;

  try {
    await axios.delete(`/v1/guidelines/${guidelineId}/comments/${commentId}/`);

    return true;
  } catch {
    return null;
  }
};
