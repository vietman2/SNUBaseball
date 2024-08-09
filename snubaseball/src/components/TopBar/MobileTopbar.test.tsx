import { fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";

import MobileTopbar from "./MobileTopbar";

jest.unmock("@components/TopBar");

describe("<MobileTopbar />", () => {
  it("should render", () => {
    render(
      <MemoryRouter>
        <MobileTopbar
          isPortrait={true}
          navigate={jest.fn()}
          openSidebar={jest.fn()}
        />
      </MemoryRouter>
    );
    
    fireEvent.click(screen.getByText("로고"));
  });
});
