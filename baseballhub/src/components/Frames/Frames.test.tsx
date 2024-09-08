import { render } from "@testing-library/react";

import { IFrame } from "./IFrame";

describe("<IFrame />", () => {
  it("renders correctly", () => {
    render(<IFrame videoId="123" />);
  });
});
