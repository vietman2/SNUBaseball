import { fireEvent, screen } from "@testing-library/react";
import { DailySchedule } from "./DailySchedule";
import { renderWithProviders } from "@utils/test-utils";

describe("<DaDailyScheduleily />", () => {
  it("renders correctly and handles go back", () => {
    renderWithProviders(<DailySchedule handleDayChange={jest.fn()} />);

    fireEvent.click(screen.getByText("뒤로"));
  });
});
