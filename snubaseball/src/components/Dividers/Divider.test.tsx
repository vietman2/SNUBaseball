import { render } from "@testing-library/react";

import { Divider } from "./Divider";

describe("<Divider />", () => {
  it("should render", () => {
    render(<Divider />);
  });
  
  it("should render bold and custom color", () => {
    render(<Divider color="#aaa" bold />);
  });
});
