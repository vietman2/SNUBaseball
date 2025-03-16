import { Route, Routes, Navigate, Outlet } from "react-router-dom";

import { AlbumList, GalleryLayout, MediaDetails } from "./Gallery";

export function ArchiveContainer() {
  return (
    <Routes>
      <Route path="/" element={<Outlet />}>
        <Route index element={<Navigate to="gallery" />} />
        <Route path="gallery" element={<GalleryLayout />}>
          <Route path=":mediaId" element={<MediaDetails />} />
          <Route path="albums" element={<AlbumList />} />
        </Route>
      </Route>
    </Routes>
  );
}
