import { describe, expect, it, vi } from "vitest";
import { fireEvent, waitFor } from "@testing-library/react";

import { MenuContainer, useMenu } from "@shared/ui/Menus";
import { renderWithProviders } from "@test-utils/renderer";

vi.unmock("@shared/ui/Menus");

const TestComponent = () => {
  const { ref, isOpen, open, close } = useMenu();

  return (
    <div>
      <button onClick={open}>Open Menu</button>
      <MenuContainer ref={ref} $isOpen={isOpen} data-testid="menu">
        <div>Menu Content</div>
        <button onClick={close}>Close Menu</button>
      </MenuContainer>
    </div>
  );
};

const TestComponentWithoutRef = () => {
  const { isOpen, open } = useMenu();

  return (
    <div>
      <button onClick={open}>Open Menu</button>
      <MenuContainer $isOpen={isOpen} data-testid="menu">
        <div>Menu Content</div>
      </MenuContainer>
    </div>
  );
};

describe("Menu", () => {
  it("opens and closes the menu correctly", () => {
    const { getByTestId, getByText } = renderWithProviders(<TestComponent />);
    const menu = getByTestId("menu");
    expect(menu).toBeInTheDocument();
    expect(menu).toHaveStyle("display: none");

    fireEvent.click(getByText("Open Menu"));
    expect(menu).toHaveStyle("display: block");
  });

  it("closes the menu by clicking outside and pressing the Escape key", async () => {
    const { getByTestId, getByText } = renderWithProviders(<TestComponent />);
    const menu = getByTestId("menu");

    fireEvent.click(getByText("Open Menu"));
    expect(menu).toHaveStyle("display: block");

    // does nothing when clicking inside the menu
    fireEvent.pointerDown(menu);
    expect(menu).toHaveStyle("display: block");

    fireEvent.pointerDown(document);
    await waitFor(() => {
      expect(menu).toHaveStyle("display: none");
    });

    fireEvent.click(getByText("Open Menu"));
    expect(menu).toHaveStyle("display: block");

    // does nothing when any other key is pressed
    fireEvent.keyDown(document, { key: "A", code: "KeyA" });
    expect(menu).toHaveStyle("display: block");

    fireEvent.keyDown(document, { key: "Escape", code: "Escape" });
    await waitFor(() => {
      expect(menu).toHaveStyle("display: none");
    });
  });

  it("does nothing when ref is not provided", () => {
    const { getByTestId, getByText } = renderWithProviders(
      <TestComponentWithoutRef />
    );
    const menu = getByTestId("menu");
    expect(menu).toBeInTheDocument();
    expect(menu).toHaveStyle("display: none");

    fireEvent.click(getByText("Open Menu"));
    expect(menu).toHaveStyle("display: block");

    fireEvent.pointerDown(document);
    expect(menu).toHaveStyle("display: block");
  });
});
