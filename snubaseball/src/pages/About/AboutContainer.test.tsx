import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";

import About from "./AboutContainer";

jest.mock("./Players/Players", () => ({
  __esModule: true,
  Players: () => <div>Players</div>,
}));

describe("<About />", () => {
  it("should render", () => {
    render(
      <MemoryRouter>
        <About />
      </MemoryRouter>
    );
  });
});
