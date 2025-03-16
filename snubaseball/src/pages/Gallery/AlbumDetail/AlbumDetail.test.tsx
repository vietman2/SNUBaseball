import { fireEvent, screen, waitFor } from "@testing-library/react";

import { AlbumDetail } from "./AlbumDetail";
import * as GalleryContext from "@contexts/gallery";
import { sampleMedia } from "@data/archives";
import { renderWithProviders } from "@utils/test-utils";

jest.mock("@fragments/Albums", () => ({
  MediaSimple: () => <div data-testid="media-simple" />,
}));

describe("<AlbumDetail />", () => {
  const defaultContext = {
    albums: [],
    files: sampleMedia,
    media: undefined,
    loading: false,
  };
  beforeEach(() => {
    jest.spyOn(GalleryContext, "useGallery").mockReturnValue(defaultContext);
  });

  it("renders loading", async () => {
    jest
      .spyOn(GalleryContext, "useGallery")
      .mockReturnValue({ ...defaultContext, loading: true });

    renderWithProviders(<AlbumDetail />);
  });

  it("renders and handles navigations", async () => {
    renderWithProviders(<AlbumDetail />);

    await waitFor(() => {
      fireEvent.click(screen.getByTestId("back"));
      fireEvent.click(screen.getByTestId("media-1"));
    });
  });
});
