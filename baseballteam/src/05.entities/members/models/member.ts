import type { DepartmentType } from "@entities/majors/@x/member";

export type MemberDetailsType = {
  id: number;
  name: string;
  student_id: string;
  admission_year: number;
  major: DepartmentType;
  profile_image: string | null;
  phone: string | null;
  email: string | null;
  address: string | null;
  birth_date: string | null;
  date_joined: string | null;
};
