import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
  useLocation,
} from "react-router";

import { AuthLayout } from "./layouts/auth/AuthLayout";
import { ModalLayout } from "./layouts/modal/ModalLayout";
import { MyProfileModal } from "./layouts/profile/MyProfileModal";
import { RootLayout } from "./layouts/root/RootLayout";

import { LoginPage } from "@pages/auth/login";
import { SignupPage } from "@pages/auth/signup";
import { AccountPage } from "@pages/profile/account";
import { NotFoundWidget } from "@widgets/not-found";

export function AppRouter() {
  return (
    <BrowserRouter>
      <RoutesWrapper />
    </BrowserRouter>
  );
}

function RoutesWrapper() {
  const location = useLocation();
  const state = location.state as { backgroundLocation?: Location };

  return (
    <>
      <Routes location={state?.backgroundLocation || location}>
        {/* 기본 라우트 */}
        <Route element={<AuthLayout />}>
          <Route path="login" element={<LoginPage />} />
          <Route path="signup" element={<SignupPage />} />
        </Route>
        <Route element={<RootLayout />}>
          <Route index element={<Navigate to="home" replace />} />
          <Route path="*" element={<NotFoundWidget />} />
        </Route>
      </Routes>

      {/* 모달 라우트 */}
      {state?.backgroundLocation && (
        <Routes>
          <Route element={<ModalLayout />}>
            <Route path="profile" element={<MyProfileModal />}>
              <Route
                index
                element={
                  <Navigate
                    to="account"
                    state={{ backgroundLocation: location }}
                    replace
                  />
                }
              />
              <Route path="account" element={<AccountPage />} />
            </Route>
          </Route>
        </Routes>
      )}
    </>
  );
}
