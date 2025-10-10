import { describe, it, expect, vi } from "vitest";

import { useFileSelect } from "@shared/lib/files";
import { renderWithProviders } from "@test-utils/renderer";

vi.unmock("@shared/lib/files");

const TestComponent = () => {
  const { overallProgress } = useFileSelect();

  return <div>Overall Progress: {overallProgress}%</div>;
};

describe("FileSelector", () => {
  it("throws when context is used outside provider", () => {
    expect(() => renderWithProviders(<TestComponent />)).toThrow(
      "useFileSelect must be used within a FileSelectProvider"
    );
  });
});
