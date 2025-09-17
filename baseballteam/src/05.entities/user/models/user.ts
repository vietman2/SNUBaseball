import type { MajorType } from "@entities/majors/@x/user";

export type MemberProfileType = {
  id: number;
  name: string;
  profile_image: { url: string } | null;
  student_id: string;
  admission_year: number;
  major: MajorType;
  phone: string | null;
  email: string | null;
  address: string | null;
};

export type UserProfileType = {
  uuid: string;
  username: string;
  role: "ADMIN" | "LEADER" | "MEMBER";
  member: MemberProfileType;
};
