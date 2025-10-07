import { describe, expect, it } from "vitest";

import { useMedia } from "@entities/gallery/media";
import { renderWithProviders } from "@test-utils/renderer";

const TestComponent = () => {
  const { isLoading } = useMedia();
  return <div>{isLoading ? "Loading..." : "Loaded"}</div>;
};

describe("MediaContext", () => {
  it("should throw error when used outside of MediaProvider", () => {
    expect(() => renderWithProviders(<TestComponent />)).toThrow(
      "useMedia must be used within a MediaProvider"
    );
  });
});
