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

export const sampleMemberDetail: MemberDetailType = {
  id: 1,
  role: "주장",
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
  birth_date: "2001/12/06",
  notes: "",
  address:
    "경기도 구리시 아차산로 487번길 10 (교문동, 교문동금호어울림아파트) 102동 701호",
  is_elite: true,
  tale: {
    weight: 90,
    height: 185,
    reason:
      "저는 중학교 때 부모님의 반대로 포기해야만 했던 선수로서의 꿈을 간접적으로나마 이루기 위해 야구부에 들어왔습니다. 그런 의미에서 야구부에 들어와 대학야구 경기에 출전할 수 있다는 사실은 제게 큰 영광입니다. 만약 선수의 길을 택했다면 고교야구나 대학야구까지 갈 수 있었는지 알 수 없기 때문입니다. 또한 제가 꿈꿨던 선수 생활과 가장 근접한 환경에서, 선수들과 가장 기량이 비슷한 준프로급 팀들과 시합을 해볼 수 있기 때문입니다.",
    goal: "3점대 방어율",
    rival: "이서준",
    role_model: "양현종",
    strength: "멘탈",
    weakness: "스테미너",
  },
};

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
