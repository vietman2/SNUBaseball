import { fireEvent, screen, waitFor } from "@testing-library/react";

import { AlbumList } from "./AlbumList";
import * as GalleryContext from "@contexts/gallery";
import { sampleAlbums } from "@data/archives";
import { renderWithProviders } from "@utils/test-utils";

jest.mock("@fragments/Albums", () => ({
  AlbumSimple: () => <div data-testid="album-simple" />,
}));

describe("<AlbumList />", () => {
  const defaultContext = {
    albums: sampleAlbums,
    files: [],
    media: undefined,
    loading: false,
  };

  beforeEach(() => {
    jest.spyOn(GalleryContext, "useGallery").mockReturnValue(defaultContext);
  });

  it("handles loading", async () => {
    jest
      .spyOn(GalleryContext, "useGallery")
      .mockReturnValue({ ...defaultContext, loading: true });
    renderWithProviders(<AlbumList />);
  });

  it("renders and handles navigations", async () => {
    renderWithProviders(<AlbumList />);

    await waitFor(() => {
      fireEvent.click(screen.getByTestId("album-1"));
    });
  });
});
