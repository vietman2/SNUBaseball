export type CollegeType = {
  id: number;
  name: string;
  short_name: string;
  departments: DepartmentType[];
};

export type DepartmentType = {
  id: number;
  name: string;
  short_name: string;
  college: string;
  college_id: number;
};
