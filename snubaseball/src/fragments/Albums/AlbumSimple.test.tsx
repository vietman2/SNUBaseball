import { fireEvent, screen } from "@testing-library/react";

import { AlbumSimple } from "./AlbumSimple";
import { sampleAlbums } from "@data/archives";
import { renderWithProviders } from "@utils/test-utils";

describe("<AlbumSimple />", () => {
  it("renders multiple cover images", () => {
    renderWithProviders(<AlbumSimple album={sampleAlbums[0]} />);

    fireEvent.animationEnd(screen.getByTestId("image"));
  });

  it("renders 1 cover image", () => {
    renderWithProviders(
      <AlbumSimple
        album={{
          ...sampleAlbums[0],
          cover_images: [
            {
              id: 1,
              url: "https://picsum.photos/200",
            },
          ],
        }}
      />
    );

    fireEvent.animationEnd(screen.getByTestId("image"));
  });

  it("renders 0 cover images", () => {
    renderWithProviders(
      <AlbumSimple
        album={{
          ...sampleAlbums[0],
          cover_images: [],
        }}
      />
    );
  });
});
