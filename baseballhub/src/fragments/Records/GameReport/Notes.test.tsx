import { render } from "@testing-library/react";

import { Notes } from "./Notes";

describe("<Notes />", () => {
  it("renders without errors", () => {
    render(<Notes />);
  });
});
