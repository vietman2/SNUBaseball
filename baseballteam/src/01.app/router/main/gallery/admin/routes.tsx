import { Route } from "react-router";

import { GalleryAdminLayout } from "./layout";
import { ManageAlbums, ManageTags } from "@pages/gallery/admin";

export const GalleryAdminRoutes = (
  <Route path="admin" element={<GalleryAdminLayout />}>
    <Route path="albums" element={<ManageAlbums />} />
    <Route path="tags" element={<ManageTags />} />
  </Route>
);
