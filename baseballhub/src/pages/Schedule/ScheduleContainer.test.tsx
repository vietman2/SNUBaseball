import { fireEvent, screen, waitFor } from "@testing-library/react";

import ScheduleContainer from "./ScheduleContainer";
import { renderWithProviders, resizeWindow } from "@utils/test-utils";

jest.mock("./WeeklySchedule/WeeklySchedule", () => ({
  WeeklySchedule: () => <div />,
}));
jest.mock("@components/Tabs", () => ({
  Tabs: ({ setActiveTab }: { setActiveTab: (tab: string) => void }) => (
    <div>
      <button onClick={() => setActiveTab("주간 훈참표")}>주간 훈참표</button>
      <button onClick={() => setActiveTab("월간 캘린더")}>월간 캘린더</button>
      <button onClick={() => setActiveTab("asdf")}>asdf</button>
    </div>
  ),
}));

describe("<ScheduleContainer />", () => {
  it("renders", async () => {
    renderWithProviders(<ScheduleContainer />);

    await waitFor(() => resizeWindow(800, 800));
    await waitFor(() => resizeWindow(600, 600));

    fireEvent.click(screen.getByText("주간 훈참표"));
    fireEvent.click(screen.getByText("월간 캘린더"));
    fireEvent.click(screen.getByText("asdf"));
  });
});
