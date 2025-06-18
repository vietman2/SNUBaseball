import { describe, expect, it, vi } from "vitest";
import { fireEvent, render, waitFor } from "@testing-library/react";

import { ColorsProvider } from "../colors/ColorsProvider";
import { useColors } from "@shared/lib/colors";

vi.unmock("@shared/lib/colors");

const MockComponent = () => {
  const { colors, toggleTheme } = useColors();

  return (
    <div>
      <p>{colors.primary}</p>
      <button onClick={toggleTheme}>Toggle Theme</button>
    </div>
  );
};

describe("ColorsProvider", () => {
  it("renders without crashing", () => {
    const { getByText } = render(
      <ColorsProvider>
        <MockComponent />
      </ColorsProvider>
    );

    waitFor(() => expect(getByText("#0F0F70")).toBeInTheDocument());

    fireEvent.click(getByText("Toggle Theme"));
  });
});
