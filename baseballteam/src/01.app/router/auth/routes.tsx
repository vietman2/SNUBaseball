import { Route } from "react-router";

import { AuthRoutesGuard, AuthLayout } from "./layout";
import { LoginPage } from "@pages/auth/login";
import { SignupPage } from "@pages/auth/signup";

export const AuthRoutes = (
  <Route
    element={
      <AuthRoutesGuard>
        <AuthLayout />
      </AuthRoutesGuard>
    }
  >
    <Route path="login" element={<LoginPage />} />
    <Route path="signup" element={<SignupPage />} />
  </Route>
);
