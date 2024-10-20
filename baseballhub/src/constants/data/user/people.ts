import {
  RoleType,
  StatusType,
  MemberType,
  MemberDetailType,
  UserProfileType,
  AuthorType,
} from "@models/user";

export const sampleRoles: RoleType[] = [
  {
    name: "주장",
    color: "#263238",
    bgColor: "#CFD8DC",
  },
  {
    name: "부주장",
    color: "#0D47A1",
    bgColor: "#BBDEFB",
  },
  {
    name: "수석",
    color: "#4A148C",
    bgColor: "#D1C4E9",
  },
  {
    name: "매니저",
    color: "#BF360C",
    bgColor: "#FFCCBC",
  },
  {
    name: "부원",
    color: "#1B5E20",
    bgColor: "#C8E6C9",
  },
];

export const sampleStatus: StatusType[] = [
  {
    name: "활동중",
    color: "#01579B",
    bgColor: "#B3E5FC",
  },
  {
    name: "군휴학",
    color: "#3E2723",
    bgColor: "#D7CCC8",
  },
];

export const sampleMembers: MemberType[] = [
  {
    id: 1,
    role: sampleRoles[0],
    name: "김유안",
    phone: "010-1234-4321",
    email: "2024-12345@snu.ac.kr",
    student_id: "2024-12345",
    admission_year: 2024,
    college: "공과대학",
    department: "건설환경공학과",
    year_level: 3,
    birth_date: "2000-01-01",
    status: sampleStatus[0],
    joined_at: "2021/03",
    num_semesters: "3학기+",
    address: "서울시 관악구 관악로 1, 71동",
    profile_image:
      "https://kr.object.ncloudstorage.com/snubaseball.test/profiles/2021-12452.jpg",
    back_number: 7,
    position: "투수",
    hands: "우투우타",
    height: 182,
    weight: 85,
  },
  {
    id: 2,
    role: sampleRoles[1],
    name: "양서진",
    phone: "010-5678-8765",
    email: "2024-67890@snu.ac.kr",
    student_id: "2024-67890",
    admission_year: 2024,
    college: "공과대학",
    department: "건설환경공학과",
    year_level: 3,
    birth_date: "2000-01-01",
    status: sampleStatus[0],
    joined_at: "2021/09",
    num_semesters: "3학기+",
    address: "서울시 관악구 관악로 1, 71동",
    profile_image:
      "https://kr.object.ncloudstorage.com/snubaseball.test/profiles/2021-18947.jpg",
    back_number: 8,
    position: "내야수",
    hands: "우투우타",
    height: 175,
    weight: 75,
  },
  {
    id: 3,
    role: sampleRoles[2],
    name: "강지민",
    phone: "010-3333-3333",
    email: "2024-33333@snu.ac.kr",
    student_id: "2024-33333",
    admission_year: 2024,
    college: "인문대학",
    department: "미학과",
    year_level: 3,
    birth_date: "2000-01-01",
    status: sampleStatus[0],
    joined_at: "2024/08",
    num_semesters: "1학기+",
    address: "서울시 관악구 관악로 1, 71동",
    profile_image:
      "https://kr.object.ncloudstorage.com/snubaseball.test/profiles/person.png",
    position: "매니저",
    hands: "",
  },
  {
    id: 4,
    role: sampleRoles[3],
    name: "박영서",
    phone: "010-2222-2222",
    email: "2024-22222@snu.ac.kr",
    student_id: "2024-22222",
    admission_year: 2024,
    college: "공과대학",
    department: "기계공학부",
    year_level: 3,
    birth_date: "2000-01-01",
    status: sampleStatus[0],
    joined_at: "2023/09",
    num_semesters: "3학기+",
    address: "서울시 관악구 관악로 1, 71동",
    profile_image:
      "https://kr.object.ncloudstorage.com/snubaseball.test/profiles/person.png",
    position: "매니저",
    hands: "",
  },
  {
    id: 5,
    role: sampleRoles[4],
    name: "노희재",
    phone: "010-1111-1111",
    email: "2024-11111@snu.ac.kr",
    student_id: "2024-11111",
    admission_year: 2024,
    college: "경영대학",
    department: "경영학과",
    year_level: 3,
    birth_date: "2000-01-01",
    status: sampleStatus[1],
    joined_at: "2022/09",
    num_semesters: "2학기",
    address: "서울시 관악구 관악로 1, 71동",
    profile_image:
      "https://kr.object.ncloudstorage.com/snubaseball.test/profiles/person.png",
    position: "내야수",
    hands: "우투우타",
    height: 175,
    weight: 75,
  },
];

export const sampleMemberDetail: MemberDetailType = sampleMembers[0];

export const sampleProfile: UserProfileType = {
  uuid: "1",
  name: "John Doe",
  profile_image: "https://via.placeholder.com/150",
  is_admin: false,
};

export const sampleAdmin: UserProfileType = {
  uuid: "1234",
  name: "김유안",
  profile_image:
    "https://kr.object.ncloudstorage.com/snubaseball.test/profiles/2021-12452.jpg",
  is_admin: true,
};

export const sampleAuthor: AuthorType = {
  uuid: "1234",
  name: "김유안",
  profile_image:
    "https://kr.object.ncloudstorage.com/snubaseball.test/profiles/2021-12452.jpg",
};
