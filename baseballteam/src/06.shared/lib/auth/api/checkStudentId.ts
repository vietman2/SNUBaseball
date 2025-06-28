import { useMutation } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";

import type { StudentIdCheckFormType } from "../models/form.types";
import type { StudentIdCheckSuccessType } from "../models/response.types";
import { type APIErrorResponse, showErrorAlert } from "@shared/api";

async function checkStudentId(
  data: StudentIdCheckFormType
): Promise<StudentIdCheckSuccessType> {
  const res = await axios.post(`/api/student_id/`, data);

  return res.data;
}

export function useStudentIdCheck() {
  return useMutation<
    StudentIdCheckSuccessType,
    AxiosError<APIErrorResponse>,
    StudentIdCheckFormType
  >({
    mutationFn: (data) => checkStudentId(data),
    onError: (e) => {
      showErrorAlert(e);
    },
  });
}
