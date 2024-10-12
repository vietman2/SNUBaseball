import { fireEvent, screen, waitFor } from "@testing-library/react";

import ManagementContainer from "./ManagementContainer";
import { renderWithProviders, resizeWindow } from "@utils/test-utils";

jest.mock("./Team/Team", () => ({
  Team: () => <div>Team Page</div>,
}));

jest.mock("@components/Tabs", () => ({
  Tabs: ({ setActiveTab }: { setActiveTab: (tab: string) => void }) => (
    <div>
      <button onClick={() => setActiveTab("Team")}>Team</button>
      <button onClick={() => setActiveTab("메디컬")}>메디컬</button>
      <button onClick={() => setActiveTab("장비 현황")}>장비 현황</button>
      <button onClick={() => setActiveTab("활동보고")}>활동보고</button>
      <button onClick={() => setActiveTab("회의록")}>회의록</button>
      <button onClick={() => setActiveTab("asdf")}>asdf</button>
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
    fireEvent.click(screen.getByText("활동보고"));
    fireEvent.click(screen.getByText("회의록"));
    fireEvent.click(screen.getByText("asdf"));
  });
});
