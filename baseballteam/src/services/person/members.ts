import axios from "axios";

export const getMembers = async (filter: string) => {
  try {
    const response = await axios.get("/v1/members/", {
      params: {
        filter,
      },
    });
    return response.data;
  } catch {
    return null;
  }
};
/*
export const getMemberDetail = async (id: number) => {
  try {
    const response = await axios.get(`/v1/members/${id}/`);
    return response.data;
  } catch {
    return null;
  }
};

export const addMember = async (
  last_name: string,
  first_name: string,
  student_id: string,
  phone: string,
  email: string,
  major: number | undefined,
  role: string,
  isElite: boolean
) => {
  if (!major) {
    return null;
  }

  try {
    const response = await axios.post("/v1/members/", {
      last_name,
      first_name,
      student_id,
      phone,
      email,
      major,
      role,
      is_elite: isElite,
    });
    return response.data;
  } catch {
    return null;
  }
};

export const deleteMember = async (id: number | undefined) => {
  if (id === undefined) return null;

  try {
    const response = await axios.delete(`/v1/members/${id}/`);

    return {
      status: 204,
      data: response.data,
    };
  } catch {
    return null;
  }
};*/
