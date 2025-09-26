import { describe, expect, it } from "vitest";

import { GalleryLayout } from "../layout";
import { renderWithProviders } from "@test-utils/renderer";

describe("GalleryLayout", () => {
  it("should render GalleryLayout correctly", () => {
    const { getByText } = renderWithProviders(<GalleryLayout />);

    expect(getByText("갤러리")).toBeInTheDocument();
  });
});
