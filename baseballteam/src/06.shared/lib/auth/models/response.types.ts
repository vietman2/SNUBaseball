import type { UserProfileType } from "./types";

export type TokenClaimResponseType = {
  user: UserProfileType;
  access: string;
};

export type StudentIdCheckSuccessType = {
  member_id: number;
  name: string;
};
