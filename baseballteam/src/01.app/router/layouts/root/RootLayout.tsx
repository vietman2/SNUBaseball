import { Navigate, Outlet } from "react-router";

import { RootHeader } from "@widgets/header";
import { useUser } from "@entities/user";

export function RootLayout() {
  const { isAuthenticated } = useUser();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div>
      <RootHeader />
      <Outlet />
    </div>
  );
}
