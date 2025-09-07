import { useQuery } from "@tanstack/react-query";

import type { CollegeType } from "../models/majors";
import { axiosInstanceWithAuth } from "@shared/lib/axios";

async function fetchAllMajorsAPI(): Promise<CollegeType[]> {
  const response = await axiosInstanceWithAuth.get<CollegeType[]>(
    "/api/v1/majors/"
  );

  return response.data;
}

export function useAllMajors() {
  return useQuery<CollegeType[], Error>({
    queryKey: ["majors"],
    queryFn: fetchAllMajorsAPI,
  });
}
