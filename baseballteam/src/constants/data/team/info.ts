import { PlayerInfoType, StaffInfoType } from "@models/team";

export const samplePlayerInfo: PlayerInfoType = {
  id: 1,
  name: "홍길동",
  position: "투수",
  back_number: 1,
  height: 180,
  weight: 80,
  profile_image: "https://via.placeholder.com/150",
};

export const sampleStaffInfo: StaffInfoType = {
  id: 1,
  name: "김철수",
  role: "코치",
  back_number: 1,
  profile_image: "https://via.placeholder.com/150",
};

export const sampleTeamInfo = {
  staff: [sampleStaffInfo],
  managers: [sampleStaffInfo],
  players: [samplePlayerInfo],
};
