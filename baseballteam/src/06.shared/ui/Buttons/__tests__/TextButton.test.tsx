import { describe, it, vi } from "vitest";

import { TextButton } from "@shared/ui/Buttons";
import { renderWithProviders } from "@test-utils/renderer";

describe("TexButton", () => {
  it("should render correctly", () => {
    renderWithProviders(<TextButton text="Button" onClick={vi.fn()} />);
  });
});
