import { describe, expect, it, vi } from "vitest";

import { Logo, LogoHorizontal } from "@shared/ui/Icons";
import { renderWithProviders } from "@test-utils/renderer";

vi.unmock("@shared/ui/Icons");

describe("Logo", () => {
  it("renders correctly with default size", () => {
    const { getByAltText } = renderWithProviders(<Logo />);
    const imgElement = getByAltText("Logo") as HTMLImageElement;
    expect(imgElement.style.width).toBe("100px");
    expect(imgElement.style.height).toBe("100px");
  });
});

describe("LogoHorizontal", () => {
  it("renders correctly with default size", () => {
    const { getByAltText, getByText } = renderWithProviders(<LogoHorizontal />);
    const imgElement = getByAltText("Logo") as HTMLImageElement;
    expect(imgElement.style.width).toBe("48px");
    expect(getByText("서울대 야구부")).toBeInTheDocument();
  });
});
