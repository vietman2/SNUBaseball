import { EquipmentSimple, EquipmentSimpleHeader } from "./EquipmentSimple";
import { sampleEquipmentSimple } from "@data/management";
import { renderWithProviders } from "@utils/test-utils";

describe("<EquipmentSimple />", () => {
  it("renders wide correctly", () => {
    renderWithProviders(
      <EquipmentSimple wide={true} equipment={sampleEquipmentSimple} />
    );
  });
});

describe("<EquipmentSimpleHeader />", () => {
  it("renders correctly", () => {
    renderWithProviders(<EquipmentSimpleHeader wide={true} />);
  });
});
