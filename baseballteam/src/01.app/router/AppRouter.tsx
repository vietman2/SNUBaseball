import { BrowserRouter, Route, Routes } from "react-router";

import { AuthLayout } from "./layouts/auth/AuthLayout";
import { LoginPage } from "@pages/login";
import { SignupPage } from "@pages/signup";

export function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AuthLayout />}>
          <Route path="login" element={<LoginPage />} />
          <Route path="signup" element={<SignupPage />} />
        </Route>
        {/**
        <Route element={<RootLayout />}>
          <Route index element={<Navigate to="home" replace />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route> */}
      </Routes>
    </BrowserRouter>
  );
}
