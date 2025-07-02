import { describe, it, vi } from "vitest";

import { AuthFormWrapper } from "@widgets/auth";
import * as AuthAPI from "@shared/lib/auth";
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

  it("handles redirects when user is logged in", () => {
    vi.spyOn(AuthAPI, "useAuth").mockReturnValue({
      user: AuthAPI.sampleCaptain,
      login: vi.fn(),
      logout: vi.fn(),
    });

    renderWithProviders(
      <AuthFormWrapper>
        <div>Contents</div>
      </AuthFormWrapper>
    );
  });
});
