import { GuidelineSimple } from "./GuidelineSimple";
import { sampleGuidelines } from "@data/training";
import { renderWithProviders } from "@utils/test-utils";

describe("<GuidelineSimple />", () => {
  it("should render", () => {
    renderWithProviders(
      <>
        <GuidelineSimple guideline={sampleGuidelines[0]} />
        <GuidelineSimple guideline={sampleGuidelines[1]} />
      </>
    );
  });
});
