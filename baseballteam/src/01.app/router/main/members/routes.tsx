import { Route } from "react-router";

import { MembersListPage } from "@pages/members";

export const MembersRoutes = (
  <Route path="members">
    <Route index element={<MembersListPage />} />
  </Route>
);
