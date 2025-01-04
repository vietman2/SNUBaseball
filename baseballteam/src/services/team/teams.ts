import axios from "axios";

export async function getTeams() {
  try {
    const response = await axios.get("/v1/teams/");

    return response.data;
  } catch {
    return null;
  }
}

export async function getTeamDetail(year: number | undefined) {
  if (!year) {
    return null;
  }

  try {
    const response = await axios.get(`/v1/teams/`, {
      params: {
        year,
      },
    });

    return response.data;
  } catch {
    return null;
  }
}
