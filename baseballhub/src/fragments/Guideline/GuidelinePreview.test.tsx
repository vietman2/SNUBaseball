import { render } from "@testing-library/react";

import { GuidelinePreview } from "./GuidelinePreview";
import { sampleGuidelines } from "@data/guidelines";

describe("<GuidelinePreview />", () => {
  it("should render", () => {
    render(<GuidelinePreview guideline={sampleGuidelines[0]} />);
  });
});
