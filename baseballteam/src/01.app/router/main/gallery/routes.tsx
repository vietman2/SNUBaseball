import { Route } from "react-router";

import { GalleryLayout } from "./layout";
import { AlbumDetails } from "@pages/gallery/album-details";
import { GalleryMainPage } from "@pages/gallery/main";

export const GalleryRoutes = (
  <Route path="gallery" element={<GalleryLayout />}>
    <Route index element={<GalleryMainPage />} />
    <Route path=":id" element={<AlbumDetails />} />
  </Route>
);
