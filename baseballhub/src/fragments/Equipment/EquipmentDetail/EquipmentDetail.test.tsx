import { EquipmentDetail } from "./EquipmentDetail";
import { renderWithProviders } from "@utils/test-utils";

describe("<EquipmentDetail />", () => {
  it("renders correctly", () => {
    renderWithProviders(<EquipmentDetail equipmentId={1} goBack={() => {}} />);
  });
});
