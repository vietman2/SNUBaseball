import { fireEvent, screen, waitFor } from "@testing-library/react";

import ForumContainer from "./ForumContainer";
import { renderWithProviders, resizeWindow } from "@utils/test-utils";

jest.mock("./Information/Information", () => ({
  Information: () => <div />,
}));
jest.mock("./Notices/Notices", () => ({
  Notices: () => <div />,
}));
jest.mock("@components/Headers", () => ({
  PageHeader: () => <div />,
  MobileHeader: ({
    setSelectedTab,
  }: {
    setSelectedTab: (tab: string) => void;
  }) => (
    <div>
      <button onClick={() => setSelectedTab("공지")}>공지</button>
      <button onClick={() => setSelectedTab("정보")}>정보</button>
      <button onClick={() => setSelectedTab("갤러리")}>갤러리</button>
      <button onClick={() => setSelectedTab("asdf")}>asdf</button>
    </div>
  ),
}));

describe("<ArchiveContainer />", () => {
  it("renders", async () => {
    renderWithProviders(<ForumContainer />);

    await waitFor(() => resizeWindow(800, 800));
    await waitFor(() => resizeWindow(600, 600));

    fireEvent.click(screen.getByText("공지"));
    fireEvent.click(screen.getByText("정보"));
    fireEvent.click(screen.getByText("갤러리"));
    fireEvent.click(screen.getByText("asdf"));
    fireEvent.click(screen.getByText("새로고침"));
  });
});
