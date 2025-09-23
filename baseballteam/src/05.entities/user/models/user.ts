import type { MemberDetailsType } from "@entities/members/@x/user";

export type UserProfileType = {
  uuid: string;
  username: string;
  role: "ADMIN" | "LEADER" | "STAFF" | "MEMBER";
  member: MemberDetailsType;
};
