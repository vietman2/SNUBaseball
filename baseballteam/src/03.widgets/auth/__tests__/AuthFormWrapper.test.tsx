import { describe, it, vi } from "vitest";

import { AuthFormWrapper } from "@widgets/auth";
import { renderWithProviders } from "@test-utils/renderer";

vi.unmock("@widgets/auth");

describe("AuthFormWrapper", () => {
  it("should render correctly", () => {
    renderWithProviders(
      <AuthFormWrapper>
        <div>Contents</div>
      </AuthFormWrapper>
    );
  });
});
