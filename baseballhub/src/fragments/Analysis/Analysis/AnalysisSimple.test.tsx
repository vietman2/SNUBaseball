import { AnalysisSimple } from "./AnalysisSimple";
import { sampleAnalyses } from "@data/notes";
import { renderWithProviders } from "@utils/test-utils";

describe("<AnalysisSimple />", () => {
  it("renders", () => {
    renderWithProviders(<AnalysisSimple analysis={sampleAnalyses[0]} />);
  });
});
