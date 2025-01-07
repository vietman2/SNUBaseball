import axios from "axios";

export const getMembers = async (filter: string) => {
  const getQuery = () => {
    if (filter === "YB") {
      return "ybs";
    }
    if (filter === "OB") {
      return "obs";
    }
    if (filter === "기타") {
      return "others";
    }
    return "";
  };

  try {
    const response = await axios.get("/v1/members/", {
      params: {
        filter: getQuery(),
      },
    });
    return response.data;
  } catch {
    return null;
  }
};

export const createMember = async (
  firstName: string,
  lastName: string,
  admissionYear: number
) => {
  try {
    const response = await axios.post("/v1/members/", {
      first_name: firstName,
      last_name: lastName,
      admission_year: admissionYear,
    });
    return response.data;
  } catch {
    return null;
  }
};

export const getMemberDetail = async (id: number) => {
  try {
    const response = await axios.get(`/v1/members/${id}/`);
    return response.data;
  } catch {
    return null;
  }
};

export const updateProfileImage = async (id: string, file: File) => {
  const formData = new FormData();
  formData.append("profile_image", file);

  try {
    await axios.post(`/v1/members/${id}/profiles/`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return true;
  } catch {
    return null;
  }
};

export const updateMember = async (
  id: string | undefined,
  data: {
    admissionYear: number;
    studentId: string;
    majorId: number | undefined;
    phone: string;
    email: string;
    address: string;
    birthDate: string;
    notes: string;
    role: string;
    status: string;
    dateJoined: string;
    numSemester: number;
    hands: string;
    position: string;
    backNumber: number;
    isElite: boolean;
  }
) => {
  if (!id) {
    return null;
  }
  try {
    await axios.put(`/v1/members/${id}/`, {
      admission_year: data.admissionYear,
      student_id: data.studentId,
      major: data.majorId,
      phone: data.phone,
      email: data.email,
      address: data.address,
      birth_date: data.birthDate,
      notes: data.notes,
      role: data.role,
      status: data.status,
      date_joined: data.dateJoined,
      num_semester: data.numSemester,
      hands: data.hands,
      position: data.position,
      back_number: data.backNumber,
      is_elite: data.isElite,
    });
    return true;
  } catch {
    return null;
  }
};
