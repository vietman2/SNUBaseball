import { describe, expect, it, vi } from "vitest";
import { render } from "@testing-library/react";

import { TokensContext, useTokens } from "@shared/lib/auth";

vi.unmock("@shared/lib/auth");

const MockComponent = () => {
  const { clearToken } = useTokens();

  return <button onClick={clearToken}>Clear Token</button>;
};

describe("useTokens", () => {
  it("should throw an error if used outside of TokensProvider", () => {
    expect(() => render(<MockComponent />)).toThrow(
      "useTokens must be used within a TokensProvider"
    );
  });

  it("should return setToken and clearToken when used within TokensProvider", () => {
    const mockSetToken = vi.fn();
    const mockClearToken = vi.fn();

    render(
      <TokensContext.Provider
        value={{ setToken: mockSetToken, clearToken: mockClearToken }}
      >
        <MockComponent />
      </TokensContext.Provider>
    );
  });
});
