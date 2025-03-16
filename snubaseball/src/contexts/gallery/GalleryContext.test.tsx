import { render, waitFor } from "@testing-library/react";
import * as Router from "react-router-dom";

import { GalleryProvider, useGallery } from "./GalleryContext";
import * as GalleryAPI from "@services/archive/gallery";
import { sampleAlbums, sampleMedia } from "@data/archives";

const TestComponent = () => {
  const { albums } = useGallery();

  return (
    <div>
      <h1>{albums.length}</h1>
    </div>
  );
};

describe("<GalleryContext />", () => {
  beforeEach(() => {
    jest
      .spyOn(Router, "useParams")
      .mockReturnValue({ albumId: "1", mediaId: "1" });
    jest.spyOn(GalleryAPI, "getAlbums").mockResolvedValue(sampleAlbums);
    jest.spyOn(GalleryAPI, "getAlbumImages").mockResolvedValue(sampleMedia);
    jest.spyOn(GalleryAPI, "getMedia").mockResolvedValue(sampleMedia[0]);
  });

  it("handles initial setting", () => {
    jest
      .spyOn(Router, "useParams")
      .mockReturnValue({ albumId: "", mediaId: "" });

    waitFor(() => {
      render(
        <GalleryProvider>
          <TestComponent />
        </GalleryProvider>
      );
    });
  });

  it("handles files and media", () => {
    waitFor(() => {
      render(
        <GalleryProvider>
          <TestComponent />
        </GalleryProvider>
      );
    });
  });

  it("handles api errors", () => {
    jest.spyOn(GalleryAPI, "getAlbums").mockResolvedValue(null);
    jest.spyOn(GalleryAPI, "getAlbumImages").mockResolvedValue(null);
    jest.spyOn(GalleryAPI, "getMedia").mockResolvedValue(null);

    waitFor(() => {
      render(
        <GalleryProvider>
          <TestComponent />
        </GalleryProvider>
      );
    });
  });

  it("should handle misuse", () => {
    expect(() => render(<TestComponent />)).toThrow();
  });
});
