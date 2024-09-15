export type PersonType = {
  id: number;
  name: string;
  birth_date: string;
  admission_year: number;
  student_id: string;
  major: string;
  role: string;
  status: string;
  phone: string;
  email: string;
  address: string;
  notes: string;
  profile_image: string;
};

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

export type UserType = {
  uuid: string;
  token: string;
};
