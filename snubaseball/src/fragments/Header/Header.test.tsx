import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";

import { Header } from "./Header";
import { resizeWindow } from "@utils/test-utils";

describe("<Header />", () => {
  it("renders landscape correctly and handles logo click", async () => {
    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    );

    await waitFor(() => resizeWindow(1200, 800));
  });

  it("renders portrait correctly and handles sidebar toggle", async () => {
    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    );

    await waitFor(() => resizeWindow(600, 400));

    fireEvent.click(screen.getByTestId("open"));
    fireEvent.click(screen.getByTestId("sidebar"));
  });

  it("renders portrait correctly and handles logo click", async () => {
    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    );

    await waitFor(() => resizeWindow(600, 400));

    fireEvent.click(screen.getByTestId("logo"));
  });
});
