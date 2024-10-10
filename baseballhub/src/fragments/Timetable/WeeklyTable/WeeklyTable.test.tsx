import { fireEvent, screen } from "@testing-library/react";
import { WeeklyTable } from "./WeeklyTable";
import { renderWithProviders } from "@utils/test-utils";

describe("<WeeklyTable />", () => {
  it("renders correctly and handles header mouse actions", () => {
    renderWithProviders(<WeeklyTable />);

    fireEvent.mouseOver(screen.getByText("월"));
    fireEvent.mouseOut(screen.getByText("월"));
    fireEvent.mouseOver(screen.getByText("화"));
    fireEvent.mouseOut(screen.getByText("화"));
    fireEvent.mouseOver(screen.getByText("수"));
    fireEvent.mouseOut(screen.getByText("수"));
    fireEvent.mouseOver(screen.getByText("목"));
    fireEvent.mouseOut(screen.getByText("목"));
    fireEvent.mouseOver(screen.getByText("금"));
    fireEvent.mouseOut(screen.getByText("금"));
    fireEvent.mouseOver(screen.getByText("토"));
    fireEvent.mouseOut(screen.getByText("토"));
  });
});
