import { Route, Routes, Navigate, Outlet } from "react-router-dom";

import { AlbumList, GalleryLayout, GalleryMain } from "./Gallery";

export function ArchiveContainer() {
  return (
    <Routes>
      <Route path="/" element={<Outlet />}>
        <Route index element={<Navigate to="gallery" />} />
        <Route path="gallery" element={<GalleryLayout />}>
          <Route index element={<GalleryMain />} />
          <Route path=":mediaId" element={<GalleryMain />} />
          <Route path="albums" element={<Outlet />}>
            <Route index element={<AlbumList />} />
          </Route>
        </Route>
      </Route>
    </Routes>
  );
}
