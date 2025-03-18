import { sampleGraduatesGroup } from "@data/events";
import { GraduatesGroup } from "./GraduatesGroup";
import { renderWithProviders } from "@utils/test-utils";

describe("<GraduatesGroup />", () => {
  it("renders without crashing", () => {
    renderWithProviders(
      <GraduatesGroup graduatesGroup={sampleGraduatesGroup} />
    );
  });
});
