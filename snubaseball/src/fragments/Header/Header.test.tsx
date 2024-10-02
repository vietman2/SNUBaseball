import { fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";

import { Header } from "./Header";

describe("<Header />", () => {
  it("renders landscape correctly and handles image toggle", () => {
    render(
      <MemoryRouter>
        <Header isWide={false} />
      </MemoryRouter>
    );
    
    fireEvent.click(screen.getByTestId("left"));
    fireEvent.click(screen.getByTestId("right"));
  });
  it("renders landscape correctly and handles logo click", () => {
    render(
      <MemoryRouter>
        <Header isWide={false} />
      </MemoryRouter>
    );

    fireEvent.click(screen.getByTestId("logo"));
  });

  it("renders portrait correctly and handles sidebar toggle", () => {
    render(
      <MemoryRouter>
        <Header isWide />
      </MemoryRouter>
    );

    fireEvent.click(screen.getByTestId("open"));
    fireEvent.click(screen.getByTestId("sidebar"));
  });

  it("renders portrait correctly and handles logo click", () => {
    render(
      <MemoryRouter>
        <Header isWide />
      </MemoryRouter>
    );

    fireEvent.click(screen.getByTestId("logo"));
  });
});
