import { ArchiveContainer } from "./ArchiveContainer";
import { renderWithProviders } from "@utils/test-utils";

jest.mock("./ArchiveMain/ArchiveMain", () => ({
  ArchiveMain: () => <div>ArchiveMain</div>,
}));

describe("<ArchiveContainer />", () => {
  it("renders ArchiveMain", () => {
    renderWithProviders(<ArchiveContainer />);
  });
});
