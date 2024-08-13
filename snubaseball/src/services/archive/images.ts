import axios from "axios";
import FormData from "form-data";

export async function uploadImage(file: File) {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("title", "윤동현");
  return axios.post("/api/archive/", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
}

export async function getImages() {
  return axios.get("/api/archive/");
}
