import { fireEvent, screen, waitFor } from "@testing-library/react";

import { WeeklySchedule } from "./WeeklySchedule";
import { renderWithProviders, resizeWindow } from "@utils/test-utils";

jest.mock("@fragments/Timetable", () => ({
  WeeklyTable: () => <div />,
}));

describe("<WeeklySchedule />", () => {
  it("renders correctly", async () => {
    renderWithProviders(<WeeklySchedule />);

    await waitFor(() => resizeWindow(800, 800));
    await waitFor(() => resizeWindow(600, 600));

    fireEvent.click(screen.getByTestId("toggle-button"));
  });
});
