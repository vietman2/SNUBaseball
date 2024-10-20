export type RoleType = {
  name: string;
  color: string;
  background_color: string;
};

export type StatusType = {
  name: string;
  color: string;
  background_color: string;
};

export type MemberType = {
  id: number;
  role: RoleType;
  name: string;
  position: string;
  hands: string;
  student_id: string;
  profile_image: string;
  major: string;
  phone: string;
  email: string;
  date_joined: string;
  num_semester: string;
  status: StatusType;
  back_number: number | null;
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
