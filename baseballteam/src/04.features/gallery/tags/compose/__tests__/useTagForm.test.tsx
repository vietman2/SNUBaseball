import { describe, expect, it } from "vitest";

import { useTagForm } from "../contexts/useTagForm";
import { renderWithProviders } from "@test-utils/renderer";

const TestComponent = () => {
  const { name } = useTagForm();

  return <div>{name}</div>;
};

describe("useTagForm", () => {
  it("should throw error when used outside of TagFormProvider", () => {
    expect(() => renderWithProviders(<TestComponent />)).toThrowError(
      "useTagForm must be used within a TagFormProvider"
    );
  });
});
