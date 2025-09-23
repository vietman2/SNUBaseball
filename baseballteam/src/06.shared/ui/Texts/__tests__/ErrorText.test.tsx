import { describe, expect, it, vi } from "vitest";

import { ErrorText } from "@shared/ui/Texts";
import { renderWithProviders } from "@test-utils/renderer";

vi.unmock("@shared/ui/Texts");

describe("ErrorText", () => {
  it("should render correctly with given text", () => {
    const { getByText } = renderWithProviders(
      <ErrorText>Error occurred</ErrorText>
    );
    expect(getByText("Error occurred")).toBeInTheDocument();
  });
});
