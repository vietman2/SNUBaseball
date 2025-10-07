import { describe, it, expect } from "vitest";

import { useUploadMediaForm } from "@features/gallery/media/upload";
import { renderWithProviders } from "@test-utils/renderer";

const TestComponent = () => {
  const {isReady} = useUploadMediaForm();
  return <div>{isReady ? "Ready" : "Not Ready"}</div>;
};

describe("useUploadMediaForm", () => {
  it("throws error when used outside provider", () => {
    expect(() => renderWithProviders(<TestComponent />)).toThrow(
      "useUploadMediaForm must be used within an UploadMediaFormProvider"
    );
  });
});
