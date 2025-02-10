import { Navigate, Outlet, Route, Routes } from "react-router-dom";

import { History } from "./History/History";
import { Players } from "./Players/Players";
import { Staff } from "./Staff/Staff";
import { Team } from "./Team/Team";

export function AboutContainer() {
  return (
    <Routes>
      <Route path="/" element={<Outlet />}>
        <Route index element={<Navigate to="history" />} />
        <Route path="history" element={<History />} />
        <Route path="team" element={<Team />} />
        <Route path="players" element={<Players />} />
        <Route path="staff" element={<Staff />} />
      </Route>
    </Routes>
  );
}
