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
