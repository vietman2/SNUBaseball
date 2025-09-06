import { describe, it, vi } from "vitest";

import { SimpleSelect } from "@shared/ui/Selects";
import { renderWithProviders } from "@test-utils/renderer";

vi.unmock("@shared/ui/Selects");

describe("SimpleSelect", () => {
  it("renders correctly", () => {
    renderWithProviders(
      <SimpleSelect data-testid="simple-select">
        <option value="option1">Option 1</option>
        <option value="option2">Option 2</option>
      </SimpleSelect>
    );
  });

  it("renders disabled state correctly", () => {
    renderWithProviders(
      <SimpleSelect data-testid="simple-select" disabled>
        <option value="option1">Option 1</option>
        <option value="option2">Option 2</option>
      </SimpleSelect>
    );
  });
});
