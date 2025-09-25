import { describe, expect, it, vi } from "vitest";
import { fireEvent } from "@testing-library/react";

import { ViewsProvider, useViews } from "@shared/lib/views";
import { renderWithProviders } from "@test-utils/renderer";

vi.unmock("@shared/lib/views");

const TestComponent = () => {
  const { activeView, switchToGrid, switchToList } = useViews();

  return (
    <div>
      <span data-testid="active-view">{activeView}</span>
      <button onClick={switchToGrid} data-testid="grid-button">
        Switch to Grid
      </button>
      <button onClick={switchToList} data-testid="list-button">
        Switch to List
      </button>
    </div>
  );
};

describe("ViewsContext", () => {
  it("provides default value and allows switching views", () => {
    const { getByTestId } = renderWithProviders(
      <ViewsProvider>
        <TestComponent />
      </ViewsProvider>
    );

    const activeView = getByTestId("active-view");
    const gridButton = getByTestId("grid-button");
    const listButton = getByTestId("list-button");

    // Default view should be GRID
    expect(activeView.textContent).toBe("GRID");

    // Switch to LIST view
    fireEvent.click(listButton);
    expect(activeView.textContent).toBe("LIST");

    // Switch back to GRID view
    fireEvent.click(gridButton);
    expect(activeView.textContent).toBe("GRID");
  });

  it("throws error when used outside of ViewsProvider", () => {
    expect(() => renderWithProviders(<TestComponent />)).toThrow(
      "useViews must be used within a ViewsProvider"
    );
  });
});
