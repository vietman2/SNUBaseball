import axios from "axios";

export async function getImages() {
  try {
    const response = await axios.get("/api/memories/");

    return {
      status: response.status,
      data: response.data,
    };
  } catch (err: any) {
    if (err.response) {
      return {
        status: err.response.status,
        data: err.response.data,
      };
    }
    return {
      status: 500,
      data: "Server Error",
    };
  }
}
