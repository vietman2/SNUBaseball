import { fireEvent, screen, waitFor } from "@testing-library/react";
import * as Router from "react-router-dom";

import { EquipmentList } from "./EquipmentList";
import { sampleEquipmentCategory } from "@data/management";
import * as EquipmentAPI from "@services/management/equipment";
import { renderWithProviders } from "@utils/test-utils";

jest.mock("@fragments/Equipment", () => ({
  EquipmentTableHeader: () => <div>EquipmentTableHeader</div>,
  EquipmentTableRow: () => <div>EquipmentTableRow</div>,
}));

describe("<EquipmentList />", () => {
  beforeEach(() => {
    jest
      .spyOn(EquipmentAPI, "getEquipment")
      .mockResolvedValue(sampleEquipmentCategory);
    jest.spyOn(Router, "useNavigate").mockReturnValue(jest.fn());
    jest.spyOn(Router, "useLocation").mockReturnValue({
      pathname: "/management/equipment",
      hash: "",
      search: "",
      state: "",
      key: "",
    });
  });

  it("should handle error", async () => {
    jest.spyOn(EquipmentAPI, "getEquipment").mockResolvedValue(null);
    renderWithProviders(<EquipmentList />);

    await waitFor(() => {
      fireEvent.click(screen.getByText("새로고침"));
    });
  });

  it("should render correctly", async () => {
    renderWithProviders(<EquipmentList />);

    await waitFor(() => {
      fireEvent.click(screen.getByTestId("equipment-1"));
    });
  });
});
