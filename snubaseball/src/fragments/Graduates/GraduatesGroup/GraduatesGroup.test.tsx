import { GraduatesGroup } from "./GraduatesGroup";
import { sampleGraduatesGroup } from "@data/events";
import { renderWithProviders } from "@utils/test-utils";

describe("<GraduatesGroup />", () => {
  it("renders without crashing", () => {
    renderWithProviders(
      <GraduatesGroup graduatesGroup={sampleGraduatesGroup} />
    );
  });
});
