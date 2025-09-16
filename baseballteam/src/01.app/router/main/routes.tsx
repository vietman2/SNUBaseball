import { Navigate, Route } from "react-router";

import { MainLayout } from "./layout";
import { NotFoundWidget } from "@widgets/not-found";

export const MainRoutes = (
  <Route element={<MainLayout />}>
    <Route index element={<Navigate to="home" replace />} />
    <Route path="*" element={<NotFoundWidget />} />
  </Route>
);
