import { Route } from "react-router";

import { MyLayout } from "./layout";
import { AccountPage } from "@pages/profile/account";
import { ComingSoon } from "@widgets/coming-soon";

export const MyRoutes = (
  <Route path="my" element={<MyLayout />}>
    <Route path="account" element={<AccountPage />} />
    <Route path="posts" element={<ComingSoon />} />
  </Route>
);
