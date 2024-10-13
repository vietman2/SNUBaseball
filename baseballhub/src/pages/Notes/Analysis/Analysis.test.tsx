import { Analysis } from "./Analysis";
import { renderWithProviders } from "@utils/test-utils";

jest.mock("@fragments/Analysis", () => ({
  AnalysisSimple: () => <div>AnalysisSimple</div>,
}));

describe("<Analysis />", () => {
  it("renders", () => {
    renderWithProviders(<Analysis />);
  });
});
