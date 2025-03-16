import axios from "axios";

export async function getHistory() {
  try {
    const response = await axios.get("/v1/teams/");

    return response.data;
  } catch {
    return null;
  }
}
