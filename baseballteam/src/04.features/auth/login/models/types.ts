import type { UserProfileType } from "@shared/lib/auth";

export type LoginResponseType = {
  user: UserProfileType;
  access: string;
};
