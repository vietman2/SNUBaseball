import { describe, expect, it } from "vitest";

import { useMajorSelects } from "@entities/majors";
import { renderWithProviders } from "@test-utils/renderer";

const TestComponent = () => {
  const { loading } = useMajorSelects();
  return <div>{loading ? "Loading..." : "Not Loading"}</div>;
};

describe("useMajorSelects", () => {
  it("throws error when used outside of MajorSelectsProvider", () => {
    expect(() => renderWithProviders(<TestComponent />)).toThrow(
      "useMajorSelects must be used within a MajorSelectsProvider"
    );
  });
});
