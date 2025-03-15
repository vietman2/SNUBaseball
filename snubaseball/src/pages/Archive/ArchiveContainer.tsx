import { Outlet, Route, Routes } from "react-router-dom";

import { ArchiveMain } from "./ArchiveMain/ArchiveMain";
import { AlbumDetail, AlbumList } from "./Gallery";

export function ArchiveContainer() {
  return (
    <Routes>
      <Route path="/" element={<Outlet />}>
        <Route index element={<ArchiveMain />} />
        <Route path="gallery" element={<Outlet />}>
          <Route index element={<AlbumList />} />
          <Route path=":albumId" element={<AlbumDetail />} />
        </Route>
      </Route>
    </Routes>
  );
}
