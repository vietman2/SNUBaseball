import { ManagementContainer } from "./ManagementContainer";
import { renderWithProviders } from "@utils/test-utils";

jest.mock("./Equipment", () => ({
  EquipmentDetail: () => <div>EquipmentDetail</div>,
  EquipmentLayout: () => <div>EquipmentLayout</div>,
}));

describe("<ManagementContainer />", () => {
  it("renders without crashing", () => {
    renderWithProviders(<ManagementContainer />);
  });
});
