import { describe, expect, it } from "vitest";

import { useAlbumForm, useGallery } from "@entities/gallery";
import { renderWithProviders } from "@test-utils/renderer";

const TestFormComponent = () => {
  const { isUpdated } = useAlbumForm();

  return <div>{isUpdated ? "Updated" : "Not Updated"}</div>;
};

const TestComponent = () => {
  const { albums } = useGallery();

  return <div>{albums.length > 0 ? "Has Albums" : "No Albums"}</div>;
};

describe("useAlbumForm", () => {
  it("should throw an error when used outside of AlbumFormProvider", () => {
    expect(() => renderWithProviders(<TestFormComponent />)).toThrow(
      "useAlbumForm must be used within a AlbumFormProvider"
    );
  });
});

describe("useGallery", () => {
  it("should throw an error when used outside of GalleryProvider", () => {
    expect(() => renderWithProviders(<TestComponent />)).toThrow(
      "useGallery must be used within a GalleryProvider"
    );
  });
});
