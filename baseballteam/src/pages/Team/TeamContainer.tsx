import { Route, Routes, Navigate, Outlet } from "react-router-dom";

import { MemberDetail, MemberEdit, MembersLayout } from "./Members";
import { TeamDetail, TeamList } from "./Team";

export function TeamContainer() {
  return (
    <Routes>
      <Route path="/" element={<Outlet />}>
        <Route index element={<Navigate to="members" />} />
        <Route path="members" element={<MembersLayout />}>
          <Route path=":memberId/edit" element={<MemberEdit />} />
          <Route path=":memberId" element={<MemberDetail />} />
        </Route>
        <Route path="info/:year" element={<TeamDetail />} />
        <Route path="info" element={<TeamList />} />
      </Route>
    </Routes>
  );
}
