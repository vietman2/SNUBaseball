import { fireEvent, screen, waitFor } from "@testing-library/react";

import AdminContainer from "./AdminContainer";
import { renderWithProviders, resizeWindow } from "@utils/test-utils";

jest.mock("./Members/Members", () => ({
  Members: () => <div />,
}));
jest.mock("@components/Headers", () => ({
  MobileHeader: () => <div />,
  PageHeader: ({
    setSelectedTab,
  }: {
    setSelectedTab: (tab: string) => void;
  }) => (
    <div>
      <button onClick={() => setSelectedTab("명부관리")}>명부관리</button>
      <button onClick={() => setSelectedTab("회계")}>회계</button>
      <button onClick={() => setSelectedTab("회의록")}>회의록</button>
      <button onClick={() => setSelectedTab("asdf")}>asdf</button>
    </div>
  ),
}));

describe("<AdminContainer />", () => {
  it("renders without crashing", async () => {
    renderWithProviders(<AdminContainer />);

    await waitFor(() => resizeWindow(600, 600));
    await waitFor(() => resizeWindow(800, 800));

    fireEvent.click(screen.getByText("명부관리"));
    fireEvent.click(screen.getByText("회계"));
    fireEvent.click(screen.getByText("회의록"));
    fireEvent.click(screen.getByText("asdf"));
  });
});
