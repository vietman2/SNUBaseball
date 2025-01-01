import { Route, Routes, Navigate, Outlet } from "react-router-dom";

import { Results } from "./Results/Results";

export function RecordsContainer() {
  return (
    <Routes>
      <Route path="/" element={<Outlet />}>
        <Route index element={<Navigate to="results" />} />
        <Route path="results" element={<Results />} />
      </Route>
    </Routes>
  );
}
