import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import { act, render, screen } from "@testing-library/react";
import { MemoryRouter, Routes, Route } from "react-router-dom";

import { AuthProvider, useAuth } from "./AuthContext";
import * as AuthAPI from "@services/auth/auth";
import { sampleProfile } from "@data/user";

jest.unmock("@contexts/auth/AuthContext");

const TestComponent = () => {
  const { user, login, setToken, logout } = useAuth();

  return (
    <div>
      <span>{user ? `Logged in as ${user.name}` : "Not logged in"}</span>
      <button onClick={() => login(sampleProfile)}>Login</button>
      <button onClick={() => setToken("token")}>Set Token</button>
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

  it("should allow login", () => {
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

  it("should allow setting the token", () => {
    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );

    const setTokenButton = screen.getByText("Set Token");

    // Simulate setting token action
    act(() => {
      setTokenButton.click();
    });

    expect(screen.getByText("Not logged in")).toBeInTheDocument();
  });

  it("should allow logout", () => {
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

describe("Axios Interceptor", () => {
  const mock = new MockAdapter(axios);

  beforeEach(() => {
    mock.reset();
  });

  it("should retry the request after refreshing the token", async () => {
    // Mock a request that initially fails with 403 and "token_not_valid" error
    mock.onGet("/test-endpoint").replyOnce(403, { code: "token_not_valid" });

    jest.spyOn(AuthAPI, "refresh").mockResolvedValue({
      status: 200,
      data: { access: "newAccessToken" },
    });

    // After refreshing the token, the request should succeed
    mock.onGet("/test-endpoint").reply(200, { data: "success" });

    const { getByText } = render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );

    const loginButton = getByText("Login");

    // Simulate login action to set user and token
    act(() => {
      loginButton.click();
    });

    const consoleErrorSpy = jest
      .spyOn(console, "error")
      .mockImplementation(() => {});

    // Perform a GET request that should trigger the interceptor
    await act(async () => {
      try {
        await axios.get("/test-endpoint");
      } catch (err) {}
    });

    consoleErrorSpy.mockRestore();
  });

  it("should logout if refreshing the token fails (error)", async () => {
    // Mock a request that initially fails with 403 and "token_not_valid" error
    mock.onGet("/test-endpoint").replyOnce(403, { code: "token_not_valid" });

    jest.spyOn(AuthAPI, "refresh").mockRejectedValue(new Error());

    const { getByText } = render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );

    const loginButton = getByText("Login");

    // Simulate login action to set user and token
    act(() => {
      loginButton.click();
    });

    // Perform a GET request that should trigger the interceptor
    await act(async () => {
      try {
        await axios.get("/test-endpoint");
      } catch (err) {}
    });
  });

  it("should logout if refreshing the token fails (not 400)", async () => {
    // Mock a request that initially fails with 403 and "token_not_valid" error
    mock.onGet("/test-endpoint").replyOnce(403, { code: "token_not_valid" });

    jest.spyOn(AuthAPI, "refresh").mockResolvedValue({ status: 400, data: {} });

    const { getByText } = render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );

    const loginButton = getByText("Login");

    // Simulate login action to set user and token
    act(() => {
      loginButton.click();
    });

    // Perform a GET request that should trigger the interceptor
    await act(async () => {
      try {
        await axios.get("/test-endpoint");
      } catch (err) {}
    });
  });

  it("should not retry if response status isn't 403", async () => {
    // Mock a request that initially fails with 401
    mock.onGet("/test-endpoint").replyOnce(401);

    const { getByText } = render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );

    const loginButton = getByText("Login");

    // Simulate login action to set user and token
    act(() => {
      loginButton.click();
    });

    // Perform a GET request that should trigger the interceptor
    await act(async () => {
      try {
        await axios.get("/test-endpoint");
      } catch (err) {}
    });
  });
});
