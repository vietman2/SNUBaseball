import { fireEvent, screen } from "@testing-library/react";

import { WeeklyTable } from "./WeeklyTable";
import { renderWithProviders } from "@utils/test-utils";

describe("<WeeklyTable />", () => {
  it("renders correctly with reasons and handles header mouse actions", () => {
    renderWithProviders(<WeeklyTable viewReason={true} />);

    const days = ["월", "화", "수", "목", "금", "토"];

    days.forEach((day) => {
      fireEvent.mouseOver(screen.getByText(day));
      fireEvent.mouseOut(screen.getByText(day));
    });
  });

  it("renders correctly without reasons", () => {
    renderWithProviders(<WeeklyTable viewReason={false} />);
  });
});
