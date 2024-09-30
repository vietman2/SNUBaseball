import { fireEvent, screen } from "@testing-library/react";
import ScheduleContainer from "./ScheduleContainer";
import { renderWithProviders } from "@utils/test-utils";

jest.mock("@fragments/Timetable", () => ({
  Daily: () => <div>Daily</div>,
  Weekly: ({ handleDayChange }: { handleDayChange: (day: string) => void }) => (
    <div onClick={() => handleDayChange("월요일")} onKeyDown={jest.fn()} role="button">
      Weekly
    </div>
  ),
}));

describe("<ScheduleContainer />", () => {
  it("renders", () => {
    renderWithProviders(<ScheduleContainer />);

    fireEvent.click(screen.getByText("Weekly"));
  });
});
