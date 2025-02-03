import { Navigate, Outlet, Route, Routes } from "react-router-dom";

export function AboutContainer() {
  return (
    <Routes>
      <Route path="/" element={<Outlet />}>
        <Route index element={<Navigate to="history" />} />
        <Route path="history" element={<div />} />
        <Route path="team" element={<div />} />
      </Route>
    </Routes>
  );
}
