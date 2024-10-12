import { fireEvent, screen, waitFor } from "@testing-library/react";

import { Stats } from "./Stats";
import { renderWithProviders, resizeWindow } from "@utils/test-utils";

jest.mock("@components/Tabs", () => ({
  ChipTabs: ({onSelect}: {onSelect: (value: string) => void}) => (
    <div>
      <button onClick={() => onSelect("타자")}>타자</button>
      <button onClick={() => onSelect("투수")}>투수</button>
    </div>
  ),
}));
jest.mock("@fragments/Stats", () => ({
  BattingTable: () => <div>BattingTable</div>,
  PitchingTable: () => <div>PitchingTable</div>,
}));

describe("<Stats />", () => {
  it("renders correctly", async () => {
    renderWithProviders(<Stats />);

    await waitFor(() => resizeWindow(800, 800));
    await waitFor(() => resizeWindow(600, 600));

    fireEvent.click(screen.getByText("타자"));
    fireEvent.click(screen.getByText("투수"));
  });
});
