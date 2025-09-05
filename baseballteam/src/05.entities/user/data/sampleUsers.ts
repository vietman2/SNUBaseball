import { type UserProfileType } from "../models/user";

export const sampleUser: UserProfileType = {
  uuid: "1",
  username: "testuser",
  member: {
    id: 1,
    name: "테스트 유저",
    profile_image: { url: "https://example.com/profile.jpg" },
    student_id: "20201234",
    admission_year: 2020,
    major: {
      id: 1,
      name: "컴퓨터공학과",
      short_name: "컴공",
      college: "공과대학",
    },
    phone: "010-1234-5678",
    email: "testuser@example.com",
    address: "서울특별시 관악구",
  },
};

export const sampleAdmin: UserProfileType = {
  uuid: "2",
  username: "adminuser",
  member: {
    id: 2,
    name: "관리자 유저",
    profile_image: null,
    student_id: "20191234",
    admission_year: 2019,
    major: {
      id: 2,
      name: "경영학과",
      short_name: "경영",
      college: "경영대학",
    },
    phone: null,
    email: "adminuser@example.com",
    address: "서울특별시 관악구",
  },
};
