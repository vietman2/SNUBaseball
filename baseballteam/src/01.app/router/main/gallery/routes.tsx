import { Route } from "react-router";

import { GalleryLayout } from "./layout";
import { GalleryAdminRoutes } from "./admin/routes";
import { MediaDisplay } from "@pages/gallery/media-display";
import { UploadMedia } from "@pages/gallery/upload";

export const GalleryRoutes = (
  <Route path="gallery" element={<GalleryLayout />}>
    {GalleryAdminRoutes}
    <Route path="upload" element={<UploadMedia />} />
    <Route path="*" element={<MediaDisplay />} />
  </Route>
);
