import { Route, Routes, Navigate, Outlet } from "react-router-dom";

import { EquipmentDetail, EquipmentLayout } from "./Equipment";
//import { MemberDetail, TeamLayout } from "./Team";
import { ComingSoon } from "@components/Fallbacks";

export function ManagementContainer() {
  return (
    <Routes>
      <Route path="/" element={<Outlet />}>
        <Route index element={<Navigate to="equipment" />} />
        {/*<Route path="team" element={<TeamLayout />}>
          <Route path=":memberId" element={<MemberDetail />} />
        </Route>*/}
        <Route path="medical" element={<ComingSoon />} />
        <Route path="equipment" element={<EquipmentLayout />}>
          <Route path=":equipmentId" element={<EquipmentDetail />} />
        </Route>
      </Route>
    </Routes>
  );
}
