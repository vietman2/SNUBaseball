export type MemberType = {
  id: number;
  role: string;
  name: string;
  phone: string;
  email: string;
  student_id: string;
  admission_year: number;
  college: string;
  department: string;
  year_level: number;
  birth_date: string;
  status: string;
  joined_at: string;
  num_semesters: string;
  address: string;
  profile_image: string;
  back_number?: number;
  position: string;
  hands: string;
  height?: number;
  weight?: number;
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

export type UserProfileType = {
  uuid: string;
  name: string;
  profile_image: string;
  role: string;
  token: string;
};
