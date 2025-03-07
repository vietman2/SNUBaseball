import { ArchiveContainer } from "./ArchiveContainer";
import { renderWithProviders } from "@utils/test-utils";

jest.mock("./Gallery/", () => ({
  AlbumList: () => <div>AlbumList</div>,
  GalleryLayout: () => <div>GalleryLayout</div>,
  GalleryMain: () => <div>GalleryMain</div>,
}));

describe("<ArchiveContainer />", () => {
  it("renders Gallery", () => {
    renderWithProviders(<ArchiveContainer />);
  });
});
