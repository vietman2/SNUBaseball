import { type UserProfileType } from "../models/user";

export const sampleUser: UserProfileType = {
  uuid: "1",
  username: "testuser",
  name: "테스트 유저",
  profile_image: null,
};

export const sampleAdmin: UserProfileType = {
  uuid: "2",
  username: "adminuser",
  name: "관리자 유저",
  profile_image: null,
};
