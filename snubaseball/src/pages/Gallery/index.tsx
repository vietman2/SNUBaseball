import { Outlet, Route, Routes } from "react-router-dom";

import { AlbumList } from "./AlbumList/AlbumList";
import { AlbumDetail } from "./AlbumDetail/AlbumDetail";

export function GalleryContainer() {
  return (
    <Routes>
      <Route path="/" element={<Outlet />}>
        <Route index element={<AlbumList />} />
        <Route path="/:albumId" element={<AlbumDetail />} />\
      </Route>
    </Routes>
  );
}
