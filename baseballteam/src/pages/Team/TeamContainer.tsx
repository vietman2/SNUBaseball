import { Route, Routes, Navigate, Outlet } from "react-router-dom";

import { MemberDetail, MemberEdit, MembersLayout } from "./Members";
import { MinutesLayout } from "./Minutes";
import { TeamDetail, TeamList } from "./Team";

import { ComingSoon } from "@components/Fallbacks";

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
        <Route path="minutes" element={<MinutesLayout />}>
          <Route path="new" element={<ComingSoon />} />
          <Route path=":minutesId/edit" element={<ComingSoon />} />
          <Route path=":minutesId" element={<ComingSoon />} />
        </Route>
      </Route>
    </Routes>
  );
}
