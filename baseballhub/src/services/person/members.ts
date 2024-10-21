/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import axios from "axios";

export const getMembers = async (filter: string) => {
  try {
    const response = await axios.get("/api/members/", {
      params: {
        filter,
      },
    });
    return response.data;
  } catch (e: any) {
    return null;
  }
};

export const getMemberDetail = async (id: number) => {
  try {
    const response = await axios.get(`/api/members/${id}/`);
    return response.data;
  } catch (e: any) {
    return null;
  }
};

export const addMember = async (
  lastname: string,
  firstname: string,
  studentId: string,
  phone: string,
  email: string,
  birthDate: string,
  startDate: string,
  departmentId: number,
  role: string,
  profileImage: File | null
) => {
  const formData = new FormData();
  formData.append("last_name", lastname);
  formData.append("first_name", firstname);
  formData.append("student_id", studentId);
  formData.append("admission_year", studentId.slice(0, 4));
  formData.append("phone", phone);
  formData.append("email", email);
  formData.append("birth_date", birthDate);
  formData.append("date_joined", startDate);
  formData.append("major", departmentId.toString());
  formData.append("role", role);
  if (profileImage) {
    formData.append("profile_image", profileImage);
  }

  try {
    const response = await axios.post("/api/members/", formData);
    return response.data;
  } catch (e: any) {
    return null;
  }
};
