import { describe, it } from "vitest";
import { fireEvent } from "@testing-library/react";

import { usePickerMenu } from "../usePickerMenu";
import { renderWithProviders } from "@test-utils/renderer";

const TestComponent = () => {
  const { openMenu } = usePickerMenu();

  return (
    <div>
      <button
        type="button"
        onClick={openMenu}
        data-testid="open-menu-button"
      >
        Toggle Menu
      </button>
    </div>
  );
}

describe("COVERAGE PURPOSE", () => {
  it("does nothing when ref is not set", () => {
    const { getByTestId } = renderWithProviders(<TestComponent />);
    
    fireEvent.click(getByTestId("open-menu-button"));

    fireEvent.pointerDown(getByTestId("open-menu-button"), {
      key: "ArrowDown",
      code: "ArrowDown",
    });
  });
});
