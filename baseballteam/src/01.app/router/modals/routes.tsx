import { Navigate, Route } from "react-router";

import { ModalLayout } from "./layout";
import { MyRoutes } from "./my/routes";

export const ModalRoutes = (
  <Route element={<ModalLayout />}>
    {MyRoutes}
    <Route path="*" element={<Navigate to="home" replace />} />
  </Route>
);
