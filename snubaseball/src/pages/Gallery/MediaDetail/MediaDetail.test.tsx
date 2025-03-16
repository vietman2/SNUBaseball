import { fireEvent, screen } from "@testing-library/react";

import { MediaDetail } from "./MediaDetail";
import * as GalleryContext from "@contexts/gallery";
import { sampleMedia } from "@data/archives";
import { renderWithProviders } from "@utils/test-utils";

describe("<MediaDetail />", () => {
  const defaultContext = {
    albums: [],
    files: [],
    media: sampleMedia[0],
    loading: false,
  };

  it("renders image correctly", () => {
    jest.spyOn(GalleryContext, "useGallery").mockReturnValue(defaultContext);

    renderWithProviders(<MediaDetail />);

    fireEvent.click(screen.getByTestId("close-modal"));
    fireEvent.click(screen.getByTestId("media"));
  });

  it("renders video correctly", () => {
    jest
      .spyOn(GalleryContext, "useGallery")
      .mockReturnValue({ ...defaultContext, media: sampleMedia[1] });

    renderWithProviders(<MediaDetail />);

    fireEvent.click(screen.getByTestId("close-modal"));
    fireEvent.click(screen.getByTestId("media"));
  });

  it("handles error correctly", () => {
    jest
      .spyOn(GalleryContext, "useGallery")
      .mockReturnValue({ ...defaultContext, media: undefined });

    renderWithProviders(<MediaDetail />);

    fireEvent.click(screen.getByTestId("close-modal"));
    fireEvent.click(screen.getByTestId("media"));
  });

  it("renders loading", () => {
    jest
      .spyOn(GalleryContext, "useGallery")
      .mockReturnValue({ ...defaultContext, loading: true });

    renderWithProviders(<MediaDetail />);
  });
});
