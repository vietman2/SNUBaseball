import { DepartmentType, CollegeType } from "@models/user/person";

export const sampleDepartments: DepartmentType[] = [
  { id: 1, name: "컴퓨터공학과", short_name: "컴공" },
  { id: 2, name: "전자공학과", short_name: "전공" },
];

export const sampleColleges: CollegeType[] = [
  {
    id: 1,
    name: "공과대학",
    short_name: "공대",
    departments: sampleDepartments,
  },
  {
    id: 2,
    name: "인문대학",
    short_name: "인대",
    departments: sampleDepartments,
  },
];
