import { describe, expect, it } from "vitest";

import { useTags } from "@entities/gallery/tags";
import { renderWithProviders } from "@test-utils/renderer";

const TestComponent = () => {
  const { isLoading } = useTags();
  return <div>{isLoading ? "Loading..." : "Loaded"}</div>;
};

describe("TagsContext", () => {
  it("should throw error when used outside of TagsProvider", () => {
    expect(() => renderWithProviders(<TestComponent />)).toThrow(
      "useTags must be used within a TagsProvider"
    );
  });
});
