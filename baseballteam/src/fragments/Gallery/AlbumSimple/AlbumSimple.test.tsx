import { fireEvent, screen } from "@testing-library/react";

import { AlbumPreview, AlbumSimple } from "./AlbumSimple";
import { sampleAlbums } from "@data/archive";
import { renderWithProviders } from "@utils/test-utils";

describe("<AlbumPreview />", () => {
  it("renders correctly", () => {
    renderWithProviders(
      <>
        <AlbumPreview album={sampleAlbums[0]} />
        <AlbumPreview album={sampleAlbums[1]} />
      </>
    );
  });
});

describe("<AlbumSimple />", () => {
  it("renders correctly", () => {
    renderWithProviders(
      <>
        <AlbumSimple
          album={sampleAlbums[0]}
          onEdit={jest.fn()}
          onDelete={jest.fn()}
        />
        <AlbumSimple
          album={sampleAlbums[1]}
          onEdit={jest.fn()}
          onDelete={jest.fn()}
        />
      </>
    );

    fireEvent.click(screen.getByTestId("open-edit-modal"));
    fireEvent.click(screen.getByTestId("delete"));
  });
});
