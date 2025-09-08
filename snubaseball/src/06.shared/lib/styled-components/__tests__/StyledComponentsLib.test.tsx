import { render } from "@testing-library/react";

import {
  ColorContext,
  GlobalStyles,
  StyledComponentsRegistry,
  light,
  useColors,
} from "@shared/lib/styled-components";
import { useMemo } from "react";

jest.unmock("@shared/lib/styled-components");

const MockComponent = () => {
  const { isDarkMode } = useColors();
  return (
    <div>
      <span>{isDarkMode ? "dark" : "light"}</span>
    </div>
  );
};

const MockProvider = ({ children }: { children: React.ReactNode }) => {
  const value = useMemo(
    () => ({
      colors: light,
      isDarkMode: false,
    }),
    []
  );

  return (
    <ColorContext.Provider value={value}>{children}</ColorContext.Provider>
  );
};

describe("StyledComponentsLib", () => {
  it("renders GlobalStyles without crashing", () => {
    const { container } = render(
      <StyledComponentsRegistry>
        <GlobalStyles />
      </StyledComponentsRegistry>
    );
    expect(container).toBeInTheDocument();
  });

  it("should throw error if useColors is used outside of ThemeProvider", () => {
    expect(() => render(<MockComponent />)).toThrow();
  });

  it("should return colors when used within ThemeProvider", () => {
    const { getByText } = render(
      <StyledComponentsRegistry>
        <MockProvider>
          <MockComponent />
        </MockProvider>
      </StyledComponentsRegistry>
    );

    expect(getByText("light")).toBeInTheDocument();
  });
});
