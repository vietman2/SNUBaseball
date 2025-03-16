import axios from "axios";

export async function createAlbum(title: string, membersOnly: boolean) {
  try {
    await axios.post("/v1/archive/albums/", {
      title,
      members_only: membersOnly,
    });
    return true;
  } catch {
    return null;
  }
}

export async function getAlbums() {
  try {
    const response = await axios.get("/v1/archive/albums/");
    return response.data;
  } catch {
    return null;
  }
}

export async function removeAlbum(id: number) {
  try {
    await axios.delete(`/v1/archive/albums/${id}/`);
    return true;
  } catch {
    return null;
  }
}

export async function updateAlbum(
  id: number,
  title: string,
  membersOnly: boolean
) {
  try {
    await axios.put(`/v1/archive/albums/${id}/`, {
      title,
      members_only: membersOnly,
    });
    return true;
  } catch {
    return null;
  }
}
