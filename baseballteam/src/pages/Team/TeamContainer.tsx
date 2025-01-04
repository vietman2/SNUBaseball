import { Route, Routes, Navigate, Outlet } from "react-router-dom";

import { MembersList } from "./Members";
import { TeamList } from "./Team";

export function TeamContainer() {
  return (
    <Routes>
      <Route path="/" element={<Outlet />}>
        <Route index element={<Navigate to="members" />} />
        <Route path="members" element={<MembersList />} />
        <Route path="info" element={<TeamList />} />
      </Route>
    </Routes>
  );
}
