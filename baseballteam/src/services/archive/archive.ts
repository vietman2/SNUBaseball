import axios from "axios";

export async function createAlbum(title: string) {
  try {
    const response = await axios.post("/v1/archive/albums/", { title });
    return response.data;
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

export async function getTags() {
  try {
    const response = await axios.get("/v1/archive/tags/");
    return response.data;
  } catch {
    return null;
  }
}
