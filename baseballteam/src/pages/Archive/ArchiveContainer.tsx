import { Route, Routes, Navigate, Outlet } from "react-router-dom";

import { GalleryMain } from "./Gallery/GalleryMain";

export function ArchiveContainer() {
  return (
    <Routes>
      <Route path="/" element={<Outlet />}>
        <Route index element={<Navigate to="gallery" />} />
        <Route path="gallery" element={<GalleryMain />} />
      </Route>
    </Routes>
  );
}
