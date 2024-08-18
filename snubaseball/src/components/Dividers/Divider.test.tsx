import { render } from "@testing-library/react";

import { Divider } from "./Divider";
import { TextDivider } from "./TextDivider";

jest.unmock("@components/Dividers");

describe("<Divider />", () => {
  it("should render", () => {
    render(<Divider />);
  });

  it("should render bold and custom color", () => {
    render(<Divider color="#aaa" />);
  });
});

describe("<TextDivider />", () => {
  it("should render", () => {
    render(<TextDivider text="Text Divider" />);
  });
});
