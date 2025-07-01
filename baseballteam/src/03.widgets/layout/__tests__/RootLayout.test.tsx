import { describe, it, vi } from "vitest";

import { RootLayout } from "@widgets/layout";
import * as AuthAPI from "@shared/lib/auth";
import { renderWithProviders } from "@test-utils/renderer";

vi.unmock("@widgets/layout");

describe("RootLayout", () => {
  it("renders the layout correctly", () => {
    vi.spyOn(AuthAPI, "useAuth").mockReturnValue({
      user: AuthAPI.sampleCaptain,
      login: vi.fn(),
      logout: vi.fn(),
    });
    renderWithProviders(<RootLayout />);
  });

  it("redirects to login page if not logged in", () => {
    vi.spyOn(AuthAPI, "useAuth").mockReturnValue({
      user: null,
      login: vi.fn(),
      logout: vi.fn(),
    });
    renderWithProviders(<RootLayout />);
  });
});
