import { WeeklySchedule } from "./WeeklySchedule";
import { renderWithProviders } from "@utils/test-utils";

jest.mock("@fragments/Timetable", () => ({
  WeeklyTable: () => <div />,
}));

describe("<WeeklySchedule />", () => {
  it("renders correctly", () => {
    renderWithProviders(<WeeklySchedule />);
  });
});
