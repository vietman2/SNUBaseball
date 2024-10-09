import { fireEvent, render, screen } from "@testing-library/react";

import Home from "./Home";

describe("<Home />", () => {
  it("should render", () => {
   render(<Home />);

   fireEvent.click(screen.getByTestId("left"));
   fireEvent.click(screen.getByTestId("right"));
  });
});
