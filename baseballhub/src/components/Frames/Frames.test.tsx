import { render } from "@testing-library/react";

import { IFrame } from "./IFrame";

jest.unmock("@components/Frames");

describe("<IFrame />", () => {
  it("renders correctly", () => {
    render(<IFrame videoId="123" />);
  });
});
