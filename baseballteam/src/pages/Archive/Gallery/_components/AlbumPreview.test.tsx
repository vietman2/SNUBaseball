import { AlbumPreview } from "./AlbumPreview";
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
