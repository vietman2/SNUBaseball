import { GuidelinePreview } from "./GuidelinePreview";
import { sampleGuidelines } from "@data/guidelines";
import { renderWithProviders } from "@utils/test-utils";

describe("<GuidelinePreview />", () => {
  it("should render", () => {
    renderWithProviders(<GuidelinePreview guideline={sampleGuidelines[0]} />);
  });
  
  it("should render long title", () => {
    renderWithProviders(<GuidelinePreview guideline={sampleGuidelines[1]} />);
  });
});
