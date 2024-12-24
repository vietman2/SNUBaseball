import { EquipmentTableHeader, EquipmentTableRow } from "./EquipmentTableRow";
import { sampleEquipmentCategory } from "@data/management";
import { renderWithProviders } from "@utils/test-utils";

describe("<EquipmentTableHeader />", () => {
  it("should render without error", () => {
    renderWithProviders(<EquipmentTableHeader />);
  });
});

describe("<EquipmentTableRow />", () => {
  it("should render without error", () => {
    renderWithProviders(
      <>
        <EquipmentTableRow category={sampleEquipmentCategory[0]} />
        <EquipmentTableRow category={sampleEquipmentCategory[1]} />
      </>
    );
  });
});
