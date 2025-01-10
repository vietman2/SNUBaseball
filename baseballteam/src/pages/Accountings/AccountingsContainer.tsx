import { Route, Routes, Navigate, Outlet } from "react-router-dom";

import { ComingSoon } from "@components/Fallbacks";

export function AccountingsContainer() {
  return (
    <Routes>
      <Route path="/" element={<Outlet />}>
        <Route index element={<Navigate to="dashboard" />} />
        <Route path="dashboard" element={<ComingSoon />} />
        <Route path="history" element={<ComingSoon />} />
      </Route>
    </Routes>
  );
}
