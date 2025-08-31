import { BrowserRouter, Navigate, Route, Routes } from "react-router";

import { AuthLayout } from "./layouts/auth/AuthLayout";
import { RootLayout } from "./layouts/root/RootLayout";
import { LoginPage } from "@pages/auth/login";
import { NotFoundWidget } from "@widgets/not-found";

export function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AuthLayout />}>
          <Route path="login" element={<LoginPage />} />
        </Route>
        <Route element={<RootLayout />}>
          <Route index element={<Navigate to="home" replace />} />
          <Route path="*" element={<NotFoundWidget />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
