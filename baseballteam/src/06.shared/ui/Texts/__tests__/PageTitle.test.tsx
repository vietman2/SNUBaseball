import { describe, expect, it, vi } from "vitest";

import { PageTitle } from "@shared/ui/Texts";
import { renderWithProviders } from "@test-utils/renderer";

vi.unmock("@shared/ui/Texts");

describe("PageTitle", () => {
  it("should render correctly with given text", () => {
    const { getByText } = renderWithProviders(
      <PageTitle>Page Title</PageTitle>
    );
    expect(getByText("Page Title")).toBeInTheDocument();
  });
});
