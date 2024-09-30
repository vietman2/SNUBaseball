import { fireEvent, screen } from "@testing-library/react";
import { Weekly } from "./Weekly";
import { renderWithProviders } from "@utils/test-utils";

describe("<Weekly />", () => {
  it("renders correctly and handles header mouse actions", () => {
    renderWithProviders(<Weekly handleDayChange={jest.fn()} />);

    fireEvent.mouseOver(screen.getByText("월"));
    fireEvent.mouseOut(screen.getByText("월"));
    fireEvent.click(screen.getByText("월"));
    fireEvent.mouseOver(screen.getByText("화"));
    fireEvent.mouseOut(screen.getByText("화"));
    fireEvent.click(screen.getByText("화"));
    fireEvent.mouseOver(screen.getByText("수"));
    fireEvent.mouseOut(screen.getByText("수"));
    fireEvent.click(screen.getByText("수"));
    fireEvent.mouseOver(screen.getByText("목"));
    fireEvent.mouseOut(screen.getByText("목"));
    fireEvent.click(screen.getByText("목"));
    fireEvent.mouseOver(screen.getByText("금"));
    fireEvent.mouseOut(screen.getByText("금"));
    fireEvent.click(screen.getByText("금"));
    fireEvent.mouseOver(screen.getByText("토"));
    fireEvent.mouseOut(screen.getByText("토"));
    fireEvent.click(screen.getByText("토"));
  });

  it("handles data item mouse actions", () => {
    renderWithProviders(<Weekly handleDayChange={jest.fn()} />);

    fireEvent.mouseOver(screen.getAllByText("O")[0]);
    fireEvent.mouseOver(screen.getAllByText("X")[0]);
    fireEvent.mouseOver(screen.getAllByText("△")[0]);
    fireEvent.mouseOver(screen.getAllByTestId("manager-schedule")[0]);
    fireEvent.mouseOver(screen.getAllByTestId("manager-schedule")[0]);
  });
});
