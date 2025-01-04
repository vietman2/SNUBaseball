import { Route, Routes, Navigate, Outlet } from "react-router-dom";

import { TeamList } from "./Team";
//import { ComingSoon } from "@components/Fallbacks";

export function TeamContainer() {
  return (
    <Routes>
      <Route path="/" element={<Outlet />}>
        <Route index element={<Navigate to="members" />} />
        <Route path="members" element={<TeamList />} />
        <Route path="info" element={<TeamList />} />
      </Route>
    </Routes>
  );
}
