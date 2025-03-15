import * as Router from "react-router-dom";

import { AlbumDetail } from "./AlbumDetail";
import { sampleMedia } from "@data/archives";
import * as GalleryAPI from "@services/archive/gallery";
import { renderWithProviders } from "@utils/test-utils";
import { fireEvent, screen, waitFor } from "@testing-library/dom";

jest.mock("@fragments/Albums", () => ({
  MediaSimple: () => <div data-testid="media-simple" />,
}));

describe("<AlbumDetail />", () => {
  beforeEach(() => {
    jest.spyOn(Router, "useParams").mockReturnValue({ albumId: "1" });
  });

  it("handles bad configuration", async () => {
    jest.spyOn(Router, "useParams").mockReturnValue({ albumId: "" });

    renderWithProviders(<AlbumDetail />);
  });

  it("renders and handles navigations", async () => {
    jest.spyOn(GalleryAPI, "getAlbumImages").mockResolvedValue(sampleMedia);

    renderWithProviders(<AlbumDetail />);

    await waitFor(() => {
      fireEvent.click(screen.getByTestId("back"));
    });
  });

  it("handles api error", async () => {
    jest.spyOn(GalleryAPI, "getAlbumImages").mockResolvedValue(null);

    renderWithProviders(<AlbumDetail />);

    await waitFor(() => {
      fireEvent.click(screen.getByTestId("back"));
    });
  });
});
