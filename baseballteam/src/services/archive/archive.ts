import axios from "axios";

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
