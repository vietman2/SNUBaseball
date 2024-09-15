import { fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";

import RootLayout from "./RootLayout";

jest.mock("@fragments/Header", () => ({
  Header: () => <div>Header</div>,
}));

describe("<RootLayout", () => {
  it("should render", () => {
    render(
      <MemoryRouter>
        <RootLayout />
      </MemoryRouter>
    );
  });
});
