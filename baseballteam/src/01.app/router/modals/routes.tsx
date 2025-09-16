import { Navigate, Route } from "react-router";

import { ModalLayout } from "./layout";
import { ProfileRoutes } from "./profile/routes";

export const ModalRoutes = (
  <Route element={<ModalLayout />}>
    {ProfileRoutes}
    <Route path="*" element={<Navigate to="home" replace />} />
  </Route>
);
