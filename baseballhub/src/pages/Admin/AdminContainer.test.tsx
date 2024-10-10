import { fireEvent, screen, waitFor } from "@testing-library/react";

import AdminContainer from "./AdminContainer";
import { renderWithProviders, resizeWindow } from "@utils/test-utils";

jest.mock("./Members/Members", () => ({
  Members: () => <div />,
}));
jest.mock("@components/Tabs", () => ({
  Tabs: ({ setActiveTab }: { setActiveTab: (tab: string) => void }) => (
    <div>
      <button onClick={() => setActiveTab("명부관리")}>명부관리</button>
      <button onClick={() => setActiveTab("회계")}>회계</button>
        <button onClick={() => setActiveTab("asdf")}>asdf</button>
    </div>
  ),
}));

describe("<AdminContainer />", () => {
  it("renders without crashing", async () => {
    renderWithProviders(<AdminContainer />);

    await waitFor(() => resizeWindow(800, 800));
    await waitFor(() => resizeWindow(600, 600));

    fireEvent.click(screen.getByText("명부관리"));
    fireEvent.click(screen.getByText("회계"));
    fireEvent.click(screen.getByText("asdf"));
  });
});
