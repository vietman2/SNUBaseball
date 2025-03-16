import axios from "axios";

export async function uploadFiles(
  files: File[],
  onProgress: (progress: number) => void,
  options?: { albumId?: number; tagsId?: number[]; membersId?: number[] }
) {
  const formData = new FormData();
  files.forEach((file) => {
    formData.append("files", file);
  });
  formData.append("options", JSON.stringify({
    album_id: options?.albumId,
    tag_ids: options?.tagsId,
    member_ids: options?.membersId,
  }));

  try {
    await axios.post("/v1/archive/", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      onUploadProgress: (progressEvent) => {
        if (progressEvent.total) {
          const percentCompleted = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          );
          onProgress(percentCompleted);
        }
      },
    });

    return true;
  } catch {
    return null;
  }
}

export async function getFiles(
  albumId: number | undefined,
  tagIds: number | undefined,
  memberId: number | undefined
) {
  const params = {
    album: albumId,
    tag: tagIds,
    member: memberId,
  };

  try {
    const response = await axios.get("/v1/archive/", { params });
    return response.data;
  } catch {
    return null;
  }
}

export async function getMediaDetails(id: number) {
  try {
    const response = await axios.get(`/v1/archive/${id}/`);
    return response.data;
  } catch {
    return null;
  }
}

export async function deleteMedia(id: number) {
  try {
    await axios.delete(`/v1/archive/${id}/`);
    return true;
  } catch {
    return false;
  }
}

export async function setAlbum(id: number, albumId: number) {
  try {
    const response = await axios.patch(`/v1/archive/${id}/`, {
      album: albumId,
    });
    return response.data;
  } catch {
    return null;
  }
}

export async function addOrRemoveTag(id: number, tagId: number) {
  try {
    const response = await axios.patch(`/v1/archive/${id}/`, { tag: tagId });
    return response.data;
  } catch {
    return null;
  }
}

export async function addOrRemovePerson(id: number, personId: number) {
  try {
    const response = await axios.patch(`/v1/archive/${id}/`, {
      person: personId,
    });
    return response.data;
  } catch {
    return null;
  }
}
