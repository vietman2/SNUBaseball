import { Route } from "react-router";

import { GalleryMainPage } from "@pages/gallery/main";

export const GalleryRoutes = (
  <Route path="gallery">
    <Route index element={<GalleryMainPage />} />
  </Route>
);
