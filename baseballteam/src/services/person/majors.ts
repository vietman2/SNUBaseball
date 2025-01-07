import axios from "axios";

export const getMajors = async () => {
  try {
    const response = await axios.get("/v1/majors/");
    return response.data;
  } catch {
    return null;
  }
};
