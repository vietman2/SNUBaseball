import { describe, expect, it, vi } from "vitest";

import { SubmitButton } from "@shared/ui/Buttons";
import { renderWithProviders } from "@test-utils/renderer";

vi.unmock("@shared/ui/Buttons");

describe("SubmitButton", () => {
  it("renders correctly when enabled", () => {
    const { getByText } = renderWithProviders(
      <SubmitButton type="submit" disabled={false}>
        Submit
      </SubmitButton>
    );
    
    expect(getByText("Submit")).toBeInTheDocument();
  });
});
