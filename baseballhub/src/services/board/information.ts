/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import axios from "axios";

export const getInformations = async () => {
  try {
    const response = await axios.get(`/api/informations/`);

    return {
      status: 200,
      data: response.data,
    };
  } catch (e: any) {
    return null;
  }
};

export const getInformationDetails = async (id: number) => {
  try {
    const response = await axios.get(`/api/informations/${id}/`);

    return {
      status: 200,
      data: response.data,
    };
  } catch (e: any) {
    return null;
  }
};

export const createInformation = async (
  title: string,
  content: string,
  pin: boolean,
  attachments: File[]
) => {
  const formData = new FormData();
  formData.append("title", title);
  formData.append("content", content);
  formData.append("pin", pin.toString());
  attachments.forEach((attachment) => {
    formData.append("attachments", attachment);
  });

  try {
    const response = await axios.post(`/api/informations/`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return {
      status: 201,
      data: response.data,
    };
  } catch (e: any) {
    return null;
  }
};

export const updateInformation = async (
  id: number,
  title: string,
  content: string,
  pin: boolean,
  attachments: File[]
) => {
  const formData = new FormData();
  formData.append("title", title);
  formData.append("content", content);
  formData.append("pin", pin.toString());
  attachments.forEach((attachment) => {
    formData.append("attachments", attachment);
  });

  try {
    const response = await axios.put(`/api/informations/${id}/`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return {
      status: 200,
      data: response.data,
    };
  } catch (e: any) {
    return null;
  }
};

export const deleteInformation = async (id: number | undefined) => {
  try {
    const response = await axios.delete(`/api/informations/${id}/`);

    return {
      status: 204,
      data: response.data,
    };
  } catch (e: any) {
    return null;
  }
};
