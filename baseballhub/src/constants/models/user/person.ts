export type RoleType = {
  name: string;
  color: string;
  bgColor: string;
};

export type StatusType = {
  name: string;
  color: string;
  bgColor: string;
};

export type MemberType = {
  id: number;
  role: RoleType;
  name: string;
  phone: string;
  email: string;
  student_id: string;
  admission_year: number;
  college: string;
  department: string;
  year_level: number;
  birth_date: string;
  status: StatusType;
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

export type MemberDetailType = MemberType;

export type UserProfileType = {
  uuid: string;
  name: string;
  profile_image: string;
  is_admin: boolean;
};

export type AuthorType = {
  uuid: string;
  name: string;
  profile_image: string;
};
