import { describe, expect, it, vi } from "vitest";

import { Logo } from "@shared/ui/Icons";
import { renderWithProviders } from "@test-utils/renderer";

vi.unmock("@shared/ui/Icons");

describe("Logo", () => {
  it("renders correctly with default options", () => {
    const { getByAltText } = renderWithProviders(<Logo />);
    const imgElement = getByAltText("Logo") as HTMLImageElement;
    expect(imgElement.style.width).toBe("100px");
    expect(imgElement.style.height).toBe("100px");
  });

  it("renders correctly with custom options", () => {
    const { getByAltText, getByText } = renderWithProviders(
      <Logo size={150} type="SILVER" horizontal />
    );
    const imgElement = getByAltText("Logo") as HTMLImageElement;
    expect(imgElement.style.width).toBe("150px");
    expect(imgElement.style.height).toBe("150px");
    expect(getByText("서울대 야구부")).toBeInTheDocument();
  });
});
