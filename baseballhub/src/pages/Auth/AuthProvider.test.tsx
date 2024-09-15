import { render } from "@testing-library/react";
import { MemoryRouter, Routes, Route } from "react-router-dom";

import { AuthProvider } from "./AuthProvider";

jest.unmock("@pages/Auth/AuthProvider");

describe("<AuthProvider />", () => {
  const Child = () => <div>Children</div>;

  beforeEach(() => {
    localStorage.clear();
  });

  it("should render children without token", () => {
    const { getByText } = render(
      <MemoryRouter>
        <Routes>
          <Route
            path="/"
            element={
              <AuthProvider>
                <Child />
              </AuthProvider>
            }
          ></Route>
        </Routes>
      </MemoryRouter>
    );
    expect(getByText("Children")).toBeInTheDocument();
  });

  it("should render children with token", () => {
    localStorage.setItem("user", JSON.stringify({ token: "token", uuid: "1" }));
    const { getByText } = render(
      <MemoryRouter>
        <Routes>
          <Route
            path="/"
            element={
              <AuthProvider>
                <Child />
              </AuthProvider>
            }
          ></Route>
        </Routes>
      </MemoryRouter>
    );
    expect(getByText("Children")).toBeInTheDocument();
  });
});
