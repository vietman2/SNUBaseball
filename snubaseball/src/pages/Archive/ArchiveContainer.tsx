import { Outlet, Route, Routes } from "react-router-dom";

import { ArchiveMain } from "./ArchiveMain/ArchiveMain";

export function ArchiveContainer() {
  return (
    <Routes>
      <Route path="/" element={<Outlet />}>
        <Route index element={<ArchiveMain />} />
      </Route>
    </Routes>
  );
}
