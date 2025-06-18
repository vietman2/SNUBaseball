import { describe, it, vi } from "vitest";

import { LoadingSpinner } from "@shared/ui/Fallbacks";
import { renderWithProviders } from "@test-utils/renderer";

vi.unmock("@shared/ui/Fallbacks");

describe("LoadingSpinner", () => {
  it("renders correctly", () => {
    renderWithProviders(<LoadingSpinner />);
  });
});
