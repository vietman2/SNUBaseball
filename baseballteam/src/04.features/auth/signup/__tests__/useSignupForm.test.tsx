import { describe, expect, it } from "vitest";

import { useSignupForm } from "@features/auth/signup";
import { renderWithProviders } from "@test-utils/renderer";

const MockComponent = () => {
  const { isLoading } = useSignupForm();

  return <div>{isLoading ? "Loading..." : "Ready"}</div>;
};

describe("useSignupForm", () => {
  it("should throw if used outside of SignupForm", () => {
    expect(() => renderWithProviders(<MockComponent />)).toThrow(
      "useSignupForm must be used within a SignupForm"
    );
  });
});
