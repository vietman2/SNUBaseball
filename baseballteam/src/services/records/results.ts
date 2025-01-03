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

export async function getResultsDetail(gameId: string | undefined) {
  if (!gameId) {
    return null;
  }

  try {
    const response = await axios.get(`/v1/results/${gameId}`);

    return response.data;
  } catch {
    return null;
  }
}
