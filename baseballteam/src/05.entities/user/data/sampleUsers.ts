import { type UserProfileType } from "../models/user";

export const sampleUser: UserProfileType = {
  uuid: "1",
  username: "testuser",
  role: "MEMBER",
  member: {
    id: 1,
    name: "테스트 유저",
    student_id: "20201234",
    admission_year: 2020,
    major: {
      id: 1,
      name: "컴퓨터공학과",
      short_name: "컴공",
      college: "공과대학",
      college_id: 1,
    },
    profile_image: "https://example.com/profile.jpg",
    phone: "010-1234-5678",
    email: "testuser@example.com",
    address: "서울특별시 관악구",
    birth_date: "2002-05-15",
    date_joined: "2020-03-01",
  },
};

export const sampleAdmin: UserProfileType = {
  uuid: "2",
  username: "adminuser",
  role: "ADMIN",
  member: {
    id: 2,
    name: "관리자 유저",
    student_id: "20191234",
    admission_year: 2019,
    major: {
      id: 2,
      name: "경영학과",
      short_name: "경영",
      college: "경영대학",
      college_id: 2,
    },
    profile_image: null,
    phone: null,
    email: "adminuser@example.com",
    address: "서울특별시 관악구",
    birth_date: null,
    date_joined: "2019-03-01",
  },
};
