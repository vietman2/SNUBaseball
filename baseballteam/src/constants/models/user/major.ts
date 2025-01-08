export type DepartmentType = {
  id: number;
  name: string;
  short_name: string;
};

export type CollegeType = {
  id: number;
  name: string;
  short_name: string;
  departments: DepartmentType[];
};
