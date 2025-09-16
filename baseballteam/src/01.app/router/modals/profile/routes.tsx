import { Route } from "react-router";

import { ProfileLayout } from "./layout";
import { AccountPage } from "@pages/profile/account";
import { MemberProfilePage } from "@pages/profile/member";

export const ProfileRoutes = (
  <Route path="profile" element={<ProfileLayout />}>
    <Route path="account" element={<AccountPage />} />
    <Route path="info" element={<MemberProfilePage />} />
  </Route>
);
