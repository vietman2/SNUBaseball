import { Route, Routes, Navigate, Outlet } from "react-router-dom";

import { Gallery } from "./Gallery/Gallery";

export function ArchiveContainer() {
  return (
    <Routes>
      <Route path="/" element={<Outlet />}>
        <Route index element={<Navigate to="gallery" />} />
        <Route path="gallery" element={<Gallery />} />
      </Route>
    </Routes>
  );
}
