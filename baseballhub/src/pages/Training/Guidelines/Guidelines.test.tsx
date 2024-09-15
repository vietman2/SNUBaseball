import { render } from "@testing-library/react";

import Guidelines from "./Guidelines";

jest.mock("@fragments/Guideline", () => ({
  GuidelineDetail: () => <div>GuidelineDetail</div>,
  GuidelinePreview: () => <div>GuidelinePreview</div>,
}));

describe("<Guidelines />", () => {
  it("should render without errors", () => {
    render(<Guidelines />);
  });
});
