import { sampleMemberDetails } from "@entities/members/@x/user";
import { type UserProfileType } from "../models/user";

export const sampleUser: UserProfileType = {
  uuid: "1",
  username: "testuser",
  role: "MEMBER",
  member: sampleMemberDetails,
};

export const sampleAdmin: UserProfileType = {
  uuid: "2",
  username: "adminuser",
  role: "ADMIN",
  member: sampleMemberDetails,
};
