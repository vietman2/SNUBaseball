import axios from "axios";

export async function getMinutes(query: string) {
  try {
    const response = await axios.get("/v1/minutes/", {
      params: {
        query,
      },
    });

    return response.data;
  } catch {
    return null;
  }
}

export async function getMinutesDetails(minutesId: string | undefined) {
  if (!minutesId) {
    return null;
  }

  try {
    const response = await axios.get(`/v1/minutes/${minutesId}/`);

    return response.data;
  } catch {
    return null;
  }
}

export async function createMinutes(
  title: string,
  content: string,
  attachments: File[]
) {
  const formData = new FormData();
  formData.append("title", title);
  formData.append("content", content);
  attachments.forEach((attachment) => {
    formData.append("attachments", attachment);
  });

  try {
    const response = await axios.post("/v1/minutes/", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return response.data;
  } catch {
    return null;
  }
}

export async function deleteMinutes(minutesId: string | undefined) {
  if (!minutesId) {
    return null;
  }

  try {
    await axios.delete(`/v1/minutes/${minutesId}/`);

    return true;
  } catch {
    return null;
  }
}

export async function editMinutes(
  minutesId: string | undefined,
  title: string,
  content: string,
  attachments: File[]
) {
  if (!minutesId) {
    return null;
  }

  const formData = new FormData();
  formData.append("title", title);
  formData.append("content", content);
  attachments.forEach((attachment) => {
    formData.append("attachments", attachment);
  });

  try {
    const response = await axios.put(`/v1/minutes/${minutesId}/`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return response.data;
  } catch {
    return null;
  }
}
