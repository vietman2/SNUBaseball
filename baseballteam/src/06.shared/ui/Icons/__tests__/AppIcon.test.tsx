import { describe, it, vi } from "vitest";

import { AppIcon } from "@shared/ui/Icons";
import { renderWithProviders } from "@test-utils/renderer";

vi.unmock("@shared/ui/Icons");

vi.mock("../files/person.svg?react", () => {
  return {
    default: () => <svg data-testid="person-icon" />,
  };
});

describe("<AppIcon />", () => {
  it("should render without crashing", () => {
    renderWithProviders(<AppIcon icon="person" />);
  });

  it("should log an error if the icon is not found", () => {
    vi.spyOn(console, "error").mockImplementation(() => {});

    renderWithProviders(<AppIcon icon="non-existent-icon" />);
  });
});
