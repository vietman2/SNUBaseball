import { describe, it, vi } from "vitest";

import { Spinner } from "@shared/ui/Loading";
import { renderWithProviders } from "@test-utils/renderer";

vi.unmock("@shared/ui/Loading");

describe("Spinner", () => {
  it("should render correctly with default props", () => {
    renderWithProviders(<Spinner />);
  });

  it("should render correctly with custom props", () => {
    renderWithProviders(<Spinner size={36} color="blue" bold />);
  });
});
