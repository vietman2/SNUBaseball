import { fireEvent, screen, waitFor } from "@testing-library/react";

import AccountingsContainer from "./AccountingsContainer";
import { renderWithProviders, resizeWindow } from "@utils/test-utils";

jest.mock("./History/History", () => ({
    History: () => <div />,
    }));
jest.mock("@components/Headers", () => ({
  MobileHeader: () => <div />,
  PageHeader: ({
    setSelectedTab,
  }: {
    setSelectedTab: (tab: string) => void;
  }) => (
    <div>
      <button onClick={() => setSelectedTab("대시보드")}>대시보드</button>
      <button onClick={() => setSelectedTab("전체 내역")}>전체 내역</button>
      <button onClick={() => setSelectedTab("asdf")}>asdf</button>
    </div>
  ),
}));

describe("<AccountingsContainer />", () => {
  it("renders without crashing", async () => {
    renderWithProviders(<AccountingsContainer />);

    await waitFor(() => resizeWindow(600, 600));
    await waitFor(() => resizeWindow(800, 800));

    fireEvent.click(screen.getByText("대시보드"));
    fireEvent.click(screen.getByText("전체 내역"));
    fireEvent.click(screen.getByText("asdf"));
    fireEvent.click(screen.getByText("새로고침"));
  });
});
