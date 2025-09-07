import { type UserProfileType } from "../models/user";
import { createUserContext } from "@shared/lib/auth";

export const { UserContext, useUser } = createUserContext<UserProfileType>();
