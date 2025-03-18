import { render } from "@testing-library/react";

import { Subtitle } from "./Subtitle";

describe("<Subtitle />", () => {
  it("renders children and span", () => {
    const { getByText } = render(
      <Subtitle>
        Subtitle
        <span>_Caption</span>
      </Subtitle>
    );

    expect(getByText("Subtitle")).toBeInTheDocument();
    expect(getByText("_Caption")).toBeInTheDocument();
  });
});
