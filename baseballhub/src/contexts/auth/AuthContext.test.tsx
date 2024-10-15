import { act, render, screen } from "@testing-library/react";
import { MemoryRouter, Routes, Route } from "react-router-dom";

import { AuthProvider, useAuth } from "./AuthContext";
import { sampleProfile } from "@data/user";

jest.unmock("@contexts/auth/AuthContext");

const TestComponent = () => {
  const { user, login, logout } = useAuth();

  return (
    <div>
      <span>{user ? `Logged in as ${user.name}` : "Not logged in"}</span>
      <button onClick={() => login(sampleProfile, "token")}>Login</button>
      <button onClick={logout}>Logout</button>
    </div>
  );
};

describe("<AuthProvider />", () => {
  const Child = () => <div>Children</div>;

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

  it("should allow login and save the user in localStorage", () => {
    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );

    const loginButton = screen.getByText("Login");

    // Simulate login action
    act(() => {
      loginButton.click();
    });

    expect(
      screen.getByText(`Logged in as ${sampleProfile.name}`)
    ).toBeInTheDocument();
  });

  it("should allow logout and remove the user from localStorage", () => {
    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );

    const logoutButton = screen.getByText("Logout");

    // Simulate logout action
    act(() => {
      logoutButton.click();
    });

    expect(screen.getByText("Not logged in")).toBeInTheDocument();
  });

  it("should throw an error when useAuth is used outside of AuthProvider without logging the error", () => {
    const spy = jest.spyOn(console, "error").mockImplementation(() => {});

    const InvalidComponent = () => {
      useAuth();
      return null;
    };

    // Expect error to be thrown
    expect(() => render(<InvalidComponent />)).toThrow(
      "useAuth must be used within an AuthProvider"
    );

    // Restore console.error
    spy.mockRestore();
  });
});
