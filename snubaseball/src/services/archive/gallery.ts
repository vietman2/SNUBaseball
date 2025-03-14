import axios from "axios";

export async function getAlbums() {
  try {
    const response = await axios.get("/v1/archive/albums/");

    return response.data;
  } catch {
    return null;
  }
}

export async function getAlbumImages(albumId: string) {
  try {
    const response = await axios.get(`/v1/archive/albums/${albumId}/`);

    return response.data;
  } catch {
    return null;
  }
}
