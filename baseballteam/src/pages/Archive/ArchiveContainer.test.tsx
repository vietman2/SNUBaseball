import { ArchiveContainer } from "./ArchiveContainer";
import { renderWithProviders } from "@utils/test-utils";

jest.mock("./Gallery/GalleryMain", () => ({
  GalleryMain: () => <div>GalleryMain</div>,
}));

describe("<ArchiveContainer />", () => {
  it("renders Gallery", () => {
    renderWithProviders(<ArchiveContainer />);
  });
});
