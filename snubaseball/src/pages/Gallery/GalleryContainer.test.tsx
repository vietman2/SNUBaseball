import { GalleryContainer } from "./GalleryContainer";
import { renderWithProviders } from "@utils/test-utils";

jest.mock("./AlbumList/AlbumList", () => ({
  AlbumList: () => <div>AlbumList</div>,
}));
jest.mock("./AlbumDetail/AlbumDetail", () => ({
  AlbumDetail: () => <div>AlbumDetail</div>,
}));
jest.mock("./MediaDetail/MediaDetail", () => ({
  MediaDetail: () => <div>MediaDetail</div>,
}));

describe("<GalleryContainer />", () => {
  it("renders AlbumList by default", () => {
    renderWithProviders(<GalleryContainer />);
  });
});
