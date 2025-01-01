import axios from "axios";

export async function getResults(year: number) {
  try {
    const response = await axios.get("/v1/results/", {
      params: {
        year,
      },
    });

    return response.data;
  } catch {
    return null;
  }
}
