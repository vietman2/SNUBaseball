import { fireEvent, screen, waitFor } from "@testing-library/react";

import { ArchiveMain } from "./ArchiveMain";
import { sampleMemories } from "@data/archives";
import * as MemoriesAPI from "@services/archive/memories";
import { renderWithProviders } from "@utils/test-utils";

jest.mock("@fragments/Interviews", () => ({
  Interview: () => <div>Interview</div>,
}));
jest.mock("@fragments/Memories", () => ({
  Memories: () => <div>Memories</div>,
}));

describe("<ArchiveMain />", () => {
  it("renders correctly", async () => {
    jest.spyOn(MemoriesAPI, "getMemories").mockResolvedValue(sampleMemories);
    renderWithProviders(<ArchiveMain />);

    await waitFor(() => {
      expect(screen.getAllByText("Memories")[0]).toBeInTheDocument();
    });

    fireEvent.click(screen.getByTestId("more-memories"));
    fireEvent.click(screen.getByTestId("more-interviews"));
  });

  it("handles api error", async () => {
    jest.spyOn(MemoriesAPI, "getMemories").mockResolvedValue(null);
    renderWithProviders(<ArchiveMain />);
  });
});
