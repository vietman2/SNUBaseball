import { GuidelineSimple } from "./GuidelineSimple";
import { sampleGuidelines } from "@data/guidelines";
import { renderWithProviders } from "@utils/test-utils";

describe("<GuidelineSimple />", () => {
  it("should render", () => {
    renderWithProviders(<GuidelineSimple guideline={sampleGuidelines[0]} />);
  });

  it("should render long title", () => {
    renderWithProviders(<GuidelineSimple guideline={sampleGuidelines[1]} />);
  });
});
