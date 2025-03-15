import { Outlet, Route, Routes } from "react-router-dom";

import { AlbumList } from "./AlbumList/AlbumList";
import { AlbumDetail } from "./AlbumDetail/AlbumDetail";
import { MediaDetail } from "./MediaDetail/MediaDetail";
import { GalleryProvider } from "@contexts/gallery";

export function GalleryContainer() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <GalleryProvider>
            <Outlet />
          </GalleryProvider>
        }
      >
        <Route index element={<AlbumList />} />
        <Route path=":albumId/:mediaId" element={<MediaDetail />} />
        <Route path=":albumId" element={<AlbumDetail />} />
      </Route>
    </Routes>
  );
}
