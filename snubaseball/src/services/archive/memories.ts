import axios from "axios";

export async function getMemories() {
  try {
    const response = await axios.get("/v1/archive/memories/");

    return response.data;
  } catch {
    return null;
  }
}
