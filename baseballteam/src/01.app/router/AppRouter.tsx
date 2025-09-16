import { Routes } from "react-router";

import { AuthRoutes } from "./auth/routes";
import { MainRoutes } from "./main/routes";
import { ModalRoutes } from "./modals/routes";
import { useRouter } from "@shared/lib/router";

export function AppRouter() {
  const { backgroundLocation, isModal } = useRouter();

  return (
    <>
      <Routes location={backgroundLocation}>
        {AuthRoutes}
        {MainRoutes}
      </Routes>
      {isModal && <Routes>{ModalRoutes}</Routes>}
    </>
  );
}
