import { describe, expect, it, vi } from "vitest";
import { render } from "@testing-library/react";

import { createUserContext } from "@shared/lib/auth";

vi.unmock("@shared/lib/auth");

interface MockUser {
  id: string;
  name: string;
}

const { UserContext, useUser } = createUserContext<MockUser>();

const MockComponent = () => {
  const { user, isAuthenticated } = useUser();

  return (
    <div>
      {isAuthenticated ? (
        <h1>{`Welcome, ${user?.name}`}</h1>
      ) : (
        <h1>Please log in</h1>
      )}
    </div>
  );
};

describe("createUserContext", () => {
  it("should throw an error if used outside of UserProvider", () => {
    expect(() => render(<MockComponent />)).toThrow(
      "useUser must be used within a UserProvider"
    );
  });

  it("should return user and isAuthenticated when used within UserProvider", () => {
    const mockUser: MockUser = { id: "1", name: "John Doe" };

    const { getByText } = render(
      <UserContext.Provider value={{ user: mockUser, isAuthenticated: true }}>
        <MockComponent />
      </UserContext.Provider>
    );

    expect(getByText("Welcome, John Doe")).toBeInTheDocument();
  });
});
