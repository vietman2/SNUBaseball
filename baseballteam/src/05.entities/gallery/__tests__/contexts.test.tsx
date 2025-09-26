import { describe, expect, it } from "vitest";

import {
  useAlbumDetails,
  useAlbumForm,
  useGallery,
  useMediaSelects,
} from "@entities/gallery";
import { renderWithProviders } from "@test-utils/renderer";

const TestFormComponent = () => {
  const { isUpdated } = useAlbumForm();

  return <div>{isUpdated ? "Updated" : "Not Updated"}</div>;
};

const TestComponent = () => {
  const { albums } = useGallery();

  return <div>{albums.length > 0 ? "Has Albums" : "No Albums"}</div>;
};

const TestDetailsComponent = () => {
  const { isError } = useAlbumDetails();

  return <div>{isError ? "Error" : "No Error"}</div>;
};

const TestMediaSelectsComponent = () => {
  const { selectedAlbum } = useMediaSelects();

  return (
    <div>
      {selectedAlbum
        ? `Selected Album: ${selectedAlbum.title}`
        : "No Album Selected"}
    </div>
  );
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

describe("useAlbumDetails", () => {
  it("should throw an error when used outside of AlbumDetailsProvider", () => {
    expect(() => renderWithProviders(<TestDetailsComponent />)).toThrow(
      "useAlbumDetails must be used within an AlbumDetailsProvider"
    );
  });
});

describe("useMediaSelects", () => {
  it("should throw an error when used outside of MediaSelectsProvider", () => {
    expect(() => renderWithProviders(<TestMediaSelectsComponent />)).toThrow(
      "useMediaSelects must be used within a MediaSelectsProvider"
    );
  });
});
