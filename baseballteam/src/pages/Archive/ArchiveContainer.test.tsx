import { ArchiveContainer } from "./ArchiveContainer";
import { renderWithProviders } from "@utils/test-utils";

jest.mock("./Gallery/Gallery", () => ({
  Gallery: () => <div>Gallery</div>,
}));

describe("<ArchiveContainer />", () => {
  it("renders Gallery", () => {
    renderWithProviders(<ArchiveContainer />);
  });
});
