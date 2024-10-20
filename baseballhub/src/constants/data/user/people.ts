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
    background_color: "#CFD8DC",
  },
  {
    name: "부주장",
    color: "#0D47A1",
    background_color: "#BBDEFB",
  },
];

export const sampleStatus: StatusType[] = [
  {
    name: "활동중",
    color: "#01579B",
    background_color: "#B3E5FC",
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
    major: "건설환경공학과",
    status: sampleStatus[0],
    date_joined: "2021/03",
    num_semester: "3학기+",
    profile_image:
      "https://kr.object.ncloudstorage.com/snubaseball.test/profiles/2021-12452.jpg",
    back_number: 7,
    position: "투수",
    hands: "우투우타",
  },
  {
    id: 2,
    role: sampleRoles[1],
    name: "양서진",
    phone: "010-5678-8765",
    email: "2024-67890@snu.ac.kr",
    student_id: "2024-67890",
    major: "건설환경공학과",
    status: sampleStatus[0],
    date_joined: "2021/09",
    num_semester: "3학기+",
    profile_image:
      "https://kr.object.ncloudstorage.com/snubaseball.test/profiles/2021-18947.jpg",
    back_number: null,
    position: "내야수",
    hands: "우투우타",
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
  profile_image: "https://via.placeholder.com/150",
  is_admin: true,
};

export const sampleAuthor: AuthorType = {
  uuid: "1234",
  name: "김유안",
  profile_image: "https://via.placeholder.com/150",
};
