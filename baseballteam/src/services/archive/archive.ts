import axios from "axios";

export async function getTags() {
  try {
    const response = await axios.get("/v1/archive/tags/");
    return response.data;
  } catch {
    return null;
  }
}
