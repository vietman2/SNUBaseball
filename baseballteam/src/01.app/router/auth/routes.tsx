import { Route } from "react-router";

import { AuthLayout } from "./layout";
import { LoginPage } from "@pages/auth/login";
import { SignupPage } from "@pages/auth/signup";

export const AuthRoutes = (
  <Route element={<AuthLayout />}>
    <Route path="login" element={<LoginPage />} />
    <Route path="signup" element={<SignupPage />} />
  </Route>
);
