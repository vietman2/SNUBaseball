import { fireEvent, screen, waitFor } from "@testing-library/react";

import { Equipment } from "./Equipment";
import { renderWithProviders, resizeWindow } from "@utils/test-utils";

jest.mock("@fragments/Equipment", () => ({
  EquipmentDetail: ({ goBack }: { goBack: () => void }) => (
    <button onClick={goBack}>EquipmentDetail</button>
  ),
  EquipmentSimple: () => <div>EquipmentSimple</div>,
  EquipmentSimpleHeader: () => <div>EquipmentSimpleHeader</div>,
}));

describe("<Equipment />", () => {
  it("renders wide screen correctly", async () => {
    renderWithProviders(<Equipment />);

    await waitFor(() => resizeWindow(800, 800));

    fireEvent.click(screen.getByTestId("equipment-1"));
    fireEvent.click(screen.getByText("EquipmentDetail"));
  });

  it("renders mobile screen correctly", async () => {
    renderWithProviders(<Equipment />);

    await waitFor(() => resizeWindow(600, 600));

    fireEvent.click(screen.getByTestId("equipment-1"));
    fireEvent.click(screen.getByText("EquipmentDetail"));
  });
});
