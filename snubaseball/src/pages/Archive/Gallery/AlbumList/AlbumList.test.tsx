import { fireEvent, screen, waitFor } from "@testing-library/react";

import { AlbumList } from "./AlbumList";
import { sampleAlbums } from "@data/archives";
import * as GalleryAPI from "@services/archive/gallery";
import { renderWithProviders } from "@utils/test-utils";

jest.mock("@fragments/Albums", () => ({
  AlbumSimple: () => <div data-testid="album-simple" />,
}));

describe("<AlbumList />", () => {
  it("renders and handles navigations", async () => {
    jest.spyOn(GalleryAPI, "getAlbums").mockResolvedValue(sampleAlbums);

    renderWithProviders(<AlbumList />);

    await waitFor(() => {
      fireEvent.click(screen.getByTestId("back"));
      fireEvent.click(screen.getByTestId("album-1"));
    });
  });

  it("handles api error", async () => {
    jest.spyOn(GalleryAPI, "getAlbums").mockResolvedValue(null);

    renderWithProviders(<AlbumList />);

    await waitFor(() => {
      expect(screen.getByText("ErrorPage")).toBeInTheDocument();
    });
  });
});
