import { fireEvent, screen, waitFor } from "@testing-library/react";

import ManagementContainer from "./ManagementContainer";
import { renderWithProviders, resizeWindow } from "@utils/test-utils";

jest.mock("./Team/Team", () => ({
  Team: () => <div>Team Page</div>,
}));

jest.mock("@components/Headers", () => ({
  PageHeader: () => <div />,
  MobileHeader: ({
    setSelectedTab,
  }: {
    setSelectedTab: (tab: string) => void;
  }) => (
    <div>
      <button onClick={() => setSelectedTab("Team")}>Team</button>
      <button onClick={() => setSelectedTab("메디컬")}>메디컬</button>
      <button onClick={() => setSelectedTab("장비 현황")}>장비 현황</button>
      <button onClick={() => setSelectedTab("asdf")}>asdf</button>
    </div>
  ),
}));
describe("<ManagementContainer />", () => {
  it("renders", async () => {
    renderWithProviders(<ManagementContainer />);

    await waitFor(() => resizeWindow(800, 800));
    await waitFor(() => resizeWindow(600, 600));

    fireEvent.click(screen.getByText("Team"));
    fireEvent.click(screen.getByText("메디컬"));
    fireEvent.click(screen.getByText("장비 현황"));
    fireEvent.click(screen.getByText("asdf"));
  });
});
