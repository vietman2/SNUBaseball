import { Navigate, Route } from "react-router";

import { MainLayout } from "./layout";
import { MembersRoutes } from "./members/routes";
import { NotFoundWidget } from "@widgets/not-found";

const MODAL_ROUTES = ["my"];

export const MainRoutes = (
  <Route element={<MainLayout />}>
    {MODAL_ROUTES.map((path) => (
      <Route
        key={path}
        path={`${path}/*`}
        element={<Navigate to="/home" replace />}
      />
    ))}
    {MembersRoutes}
    <Route index element={<Navigate to="home" replace />} />
    <Route path="*" element={<NotFoundWidget />} />
  </Route>
);
