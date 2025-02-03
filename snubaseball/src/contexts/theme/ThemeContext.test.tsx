import { render } from "@testing-library/react";

import { ThemeProvider, useTheme } from "./ThemeContext";

const TestComponent = () => {
  const { colors } = useTheme();

  return <div>{colors.primary}</div>;
};

describe("ThemeContext", () => {
  it("should provide colors", () => {
    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>
    );
  });

  it("should handle misuse of useTheme", () => {
    expect(() => {
      render(<TestComponent />);
    }).toThrow();
  });
});
