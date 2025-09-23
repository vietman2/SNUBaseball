import { sampleDepartment } from "@entities/majors/@x/member";
import type { MemberDetailsType } from "../models/member";

export const sampleMemberDetails: MemberDetailsType = {
  id: 1,
  name: "김선수",
  student_id: "2025-12345",
  admission_year: 2025,
  major: sampleDepartment,
  profile_image: null,
  phone: "010-1234-5678",
  email: "kim@example.com",
  address: "서울시 관악구",
  birth_date: "2003-05-15",
  date_joined: "2023-03-01",
  role: "player",
  status: "active",
};
