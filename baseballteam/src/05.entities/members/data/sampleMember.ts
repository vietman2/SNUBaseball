import { type MemberDetailType } from "../models/member";

export const samplePlayerDetails: MemberDetailType = {
  type: "PLAYER",
  id: 1,
  name: "김선수",
  back_number: 10,
  birth_date: "2000-01-01",
  date_joined: "2020-03-01",
  num_semester: 8,
  extras: {
    position: "투수",
    bat_throw_hands: "우투우타",
    height: 180,
    weight: 75,
  },
};

export const sampleManagerDetails: MemberDetailType = {
  type: "MANAGER",
  id: 2,
  name: "박매니저",
  back_number: null,
  birth_date: null,
  date_joined: "2019-03-01",
  num_semester: 10,
};
