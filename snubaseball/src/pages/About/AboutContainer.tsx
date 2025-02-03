import { Navigate, Outlet, Route, Routes } from "react-router-dom";

import { History } from "./History/History";
import { Team } from "./Team/Team";

export function AboutContainer() {
  return (
    <Routes>
      <Route path="/" element={<Outlet />}>
        <Route index element={<Navigate to="history" />} />
        <Route path="history" element={<History />} />
        <Route path="team" element={<Team />} />
      </Route>
    </Routes>
  );
}
