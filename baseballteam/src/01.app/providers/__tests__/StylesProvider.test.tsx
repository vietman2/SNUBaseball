import { describe, expect, it, vi } from "vitest";
import { fireEvent} from "@testing-library/react";

import { StylesProvider } from "../styles/StylesProvider";
import { useColors } from "@shared/lib/styles";
import { renderWithProviders } from "@test-utils/renderer";

vi.unmock("@shared/lib/styles");

const MockComponent = () => {
  const { toggleTheme, isDarkMode } = useColors();

  return (
    <div>
      <span>{isDarkMode ? "Dark Mode" : "Light Mode"}</span>
      <button onClick={toggleTheme}>Toggle Theme</button>
    </div>
  );
};

describe("StylesProvider", () => {
  it("should render children", () => {
    const { getByText } = renderWithProviders(
      <StylesProvider>
        <MockComponent />
      </StylesProvider>
    );

    expect(getByText("Light Mode")).toBeInTheDocument();

    fireEvent.click(getByText("Toggle Theme"));

    expect(getByText("Dark Mode")).toBeInTheDocument();
  });
});
