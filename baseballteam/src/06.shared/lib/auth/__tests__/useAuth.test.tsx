import { useMemo } from "react";
import { describe, expect, it, vi } from "vitest";
import { render } from "@testing-library/react";

import { AuthContext, useAuth } from "@shared/lib/auth";

vi.unmock("@shared/lib/auth");

const MockComponent = () => {
  const { user } = useAuth();

  return <div>{user ? user.name : "Not Authenticated"}</div>;
};

const MockProvider = ({ children }: { children: React.ReactNode }) => {
  const value = useMemo(
    () => ({
      user: null,
      login: vi.fn(),
      logout: vi.fn(),
    }),
    []
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

describe("useAuth", () => {
  it("should throw an error if used outside of AuthProvider", () => {
    vi.spyOn(console, "error").mockImplementation(() => {});

    expect(() => render(<MockComponent />)).toThrow();
  });

  it("should return values when used within AuthProvider", () => {
    const { getByText } = render(
      <MockProvider>
        <MockComponent />
      </MockProvider>
    );

    expect(getByText("Not Authenticated")).toBeInTheDocument();
  });
});
