import axios from "axios";

export const checkStudentId = async (studentId: string) => {
  try {
    const response = await axios.get(`/api/student_id/`, {
      params: {
        student_id: studentId,
      },
    });

    return {
      status: 200,
      data: response.data,
    };
  } catch (e: any) {
    if (e.response && e.response.status === 400) {
      return {
        status: 400,
        error: e.response.data.error,
      };
    }

    return null;
  }
};

export const signUp = async (
  memberID: number,
  username: string,
  password: string,
  passwordConfirm: string
) => {
  try {
    const response = await axios.post(`/api/register/`, {
      member_id: memberID,
      username: username,
      password: password,
      password2: passwordConfirm,
    });

    return {
      status: 201,
      data: response.data,
    };
  } catch (e: any) {
    if (e.response && e.response.status === 400) {
      return {
        status: 400,
        error: e.response.data.error,
      };
    }

    return null;
  }
};
