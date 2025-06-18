import { describe, it } from "vitest";

import { LoadingSpinner } from "@shared/ui/Fallbacks";
import { renderWithProviders } from "@test-utils/renderer";

describe("LoadingSpinner", () => {
  it("renders correctly", () => {
    renderWithProviders(<LoadingSpinner />);
  });
});
