import axios from "axios";

export const getMajors = async () => {
  try {
    const response = await axios.get("/api/majors/");
    return response.data;
  } catch (e: any) {
    return null;
  }
};
