import { fireEvent, screen } from "@testing-library/react";

import { ArchiveMain } from "./ArchiveMain";
import { renderWithProviders } from "@utils/test-utils";

jest.mock("@fragments/Interviews", () => ({
  Interview: () => <div>Interview</div>,
}));
jest.mock("@fragments/Memories", () => ({
  Memories: () => <div>Memories</div>,
}));

describe("<ArchiveMain />", () => {
  it("renders correctly", () => {
    renderWithProviders(<ArchiveMain />);

    fireEvent.click(screen.getByTestId("more-memories"));
    fireEvent.click(screen.getByTestId("more-interviews"));
  });
});
