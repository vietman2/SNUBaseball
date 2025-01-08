import axios from "axios";

export async function getTeams() {
  try {
    const response = await axios.get("/v1/teams/");

    return response.data;
  } catch {
    return null;
  }
}

export async function getTeamDetail(year: string | undefined) {
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

export async function createTeam(
  year: string,
  professor: string,
  headCoach: string,
  headManager: string,
  captain: string,
  viceCaptain: string
) {
  try {
    const response = await axios.post("/v1/teams/", {
      year,
      professor,
      head_coach: headCoach,
      head_manager: headManager,
      captain,
      vice_captain: viceCaptain,
    });

    return response.data;
  } catch {
    return null;
  }
}

export async function getMemberOptions(year: string | undefined) {
  if (!year) {
    return null;
  }

  try {
    const response = await axios.get(`/v1/teams/players/`, {
      params: {
        year,
      },
    });

    return response.data;
  } catch {
    return null;
  }
}

export async function createTeamMember(
  year: string | undefined,
  memberId: number | undefined,
  backNumber: number,
  role: string,
  isRegistered: boolean
) {
  if (!year || !memberId) {
    return null;
  }

  try {
    const response = await axios.post(`/v1/teams/player/`, {
      year,
      member_id: memberId,
      back_number: backNumber,
      role,
      is_registered: isRegistered,
    });

    return response.data;
  } catch {
    return null;
  }
}
