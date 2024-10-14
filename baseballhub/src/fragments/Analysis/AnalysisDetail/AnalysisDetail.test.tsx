import { AnalysisDetail } from "./AnalysisDetail";
import { renderWithProviders } from "@utils/test-utils";

describe("<AnalysisDetail />", () => {
  it("renders correctly", () => {
    renderWithProviders(<AnalysisDetail analysisId={1} goBack={jest.fn()} />);
  });
});
