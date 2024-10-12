import { fireEvent, screen, waitFor } from "@testing-library/react";

import ScheduleContainer from "./ScheduleContainer";
import { renderWithProviders, resizeWindow } from "@utils/test-utils";

jest.mock("./WeeklySchedule/WeeklySchedule", () => ({
  WeeklySchedule: () => <div />,
}));
jest.mock("@components/Headers", () => ({
  MobileHeader: () => <div />,
  PageHeader: ({
    setSelectedTab,
  }: {
    setSelectedTab: (tab: string) => void;
  }) => (
    <div>
      <button onClick={() => setSelectedTab("주간 훈참표")}>주간 훈참표</button>
      <button onClick={() => setSelectedTab("훈련계획표")}>훈련계획표</button>
      <button onClick={() => setSelectedTab("월간 캘린더")}>월간 캘린더</button>
      <button onClick={() => setSelectedTab("asdf")}>asdf</button>
    </div>
  ),
}));

describe("<ScheduleContainer />", () => {
  it("renders", async () => {
    renderWithProviders(<ScheduleContainer />);

    await waitFor(() => resizeWindow(600, 600));
    await waitFor(() => resizeWindow(800, 800));

    fireEvent.click(screen.getByText("주간 훈참표"));
    fireEvent.click(screen.getByText("훈련계획표"));
    fireEvent.click(screen.getByText("월간 캘린더"));
    fireEvent.click(screen.getByText("asdf"));
  });
});
