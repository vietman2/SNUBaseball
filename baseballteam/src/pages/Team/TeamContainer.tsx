import { Route, Routes, Navigate, Outlet } from "react-router-dom";

import { MembersList } from "./Members";
//import { ComingSoon } from "@components/Fallbacks";

export function TeamContainer() {
  return (
    <Routes>
      <Route path="/" element={<Outlet />}>
        <Route index element={<Navigate to="info" />} />
        <Route path="info" element={<MembersList />} />
      </Route>
    </Routes>
  );
}
