import { describe, expect, it } from "vitest";

import { useUploadMediaForm } from "../contexts/useUploadMediaForm";
import { renderWithProviders } from "@test-utils/renderer";

const TestComponent = () => {
  const { isReady } = useUploadMediaForm();
  return <div>{isReady ? "Ready" : "Not Ready"}</div>;
};

describe("useUploadMediaForm", () => {
  it("throws error when used outside of provider", () => {
    expect(() => renderWithProviders(<TestComponent />)).toThrow(
      "useUploadMediaForm must be used within an UploadMediaFormProvider"
    );
  });
});
