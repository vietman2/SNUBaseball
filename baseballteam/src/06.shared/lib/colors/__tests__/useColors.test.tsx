import { describe, expect, it, vi } from "vitest";
import { render } from "@testing-library/react";

import { ColorContext, light, useColors } from "@shared/lib/colors";

vi.unmock("@shared/lib/colors");

const MockComponent = () => {
  const { colors } = useColors();

  return <div>{colors.primary}</div>;
};

const MockProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <ColorContext.Provider value={{ colors: light, toggleTheme: vi.fn() }}>
      {children}
    </ColorContext.Provider>
  );
};

describe("useColors", () => {
  it("should throw an error if used outside of ColorsProvider", () => {
    expect(() => render(<MockComponent />)).toThrow();
  });

  it("should return colors when used within ColorsProvider", () => {
    const { getByText } = render(
      <MockProvider>
        <MockComponent />
      </MockProvider>
    );

    expect(getByText("#0F0F70")).toBeInTheDocument();
  });
});
