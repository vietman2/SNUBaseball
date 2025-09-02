import { describe, it, expect } from "vitest";

import { AccountPage } from "@pages/profile/account";
import { renderWithProviders } from "@test-utils/renderer";

describe("AccountPage", () => {
  it("renders without crashing", () => {
    const { getByText } = renderWithProviders(<AccountPage />);
    expect(getByText("계정")).toBeInTheDocument();
  });
});
