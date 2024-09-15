import { render } from "@testing-library/react";

import {GuidelineDetail} from "./GuidelineDetail";
import { sampleGuidelines } from "@data/guidelines";

describe("<GuidelineDetail />", () => {
  it("renders null correctly", () => {
    render(<GuidelineDetail guideline={null} />);
  });
  
  it("renders guideline correctly", () => {
    render(<GuidelineDetail guideline={sampleGuidelines[0]} />);
  });
});
