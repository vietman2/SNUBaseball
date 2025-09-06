import { describe, it, vi } from "vitest";
import { fireEvent } from "@testing-library/react";

import { PhoneInput } from "@shared/ui/Inputs";
import { renderWithProviders } from "@test-utils/renderer";

vi.unmock("@shared/ui/Inputs");

describe("PhoneInput", () => {
  it("renders correctly with default props", () => {
    const { getByTestId } = renderWithProviders(
      <PhoneInput value="" onChange={vi.fn()} data-testid="phone-input" />
    );

    fireEvent.change(getByTestId("phone-input"), {
      target: { value: "01012345678" },
    });
  });
});
