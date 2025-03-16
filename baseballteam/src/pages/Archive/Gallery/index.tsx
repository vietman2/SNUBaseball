import { Outlet, useMatch } from "react-router-dom";

import { AlbumList } from "./AlbumList/AlbumList";
import { GalleryMain } from "./GalleryMain/GalleryMain";
import { MediaDetails } from "./MediaDetails/MediaDetails";
import { GalleryProvider } from "@contexts/gallery";

function GalleryLayout() {
  // check if location matches "/archive/gallery/albums"
  const isAlbums = useMatch("/archive/gallery/albums");

  return (
    <GalleryProvider>
      {!isAlbums && <GalleryMain />}
      <Outlet />
    </GalleryProvider>
  );
}

export { AlbumList, GalleryLayout, MediaDetails };
