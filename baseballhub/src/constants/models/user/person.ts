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

type PlayerTaleType = {
  weight: number;
  height: number;
  reason: string;
  goal: string;
  rival: string;
  role_model: string;
  strength: string;
  weakness: string;
};

export type MemberDetailType = {
  id: number;
  role: string;
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
  birth_date: string;
  notes: string;
  address: string;
  is_elite: boolean;
  tale?: PlayerTaleType;
};

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
