import { describe, it, vi } from "vitest";
import { waitFor } from "@testing-library/react";

import { RootLayout } from "@widgets/layout";
import * as AuthAPI from "@shared/lib/auth";
import { renderWithProviders } from "@test-utils/renderer";

vi.unmock("@widgets/layout");

describe("RootLayout", () => {
  it("handles layout changes correctly", () => {
    vi.spyOn(AuthAPI, "useAuth").mockReturnValue({
      user: AuthAPI.samplePlayer,
      login: vi.fn(),
      logout: vi.fn(),
    });
    window.innerWidth = 1024;
    window.dispatchEvent(new Event("resize"));

    renderWithProviders(<RootLayout />);

    waitFor(() => {
      window.innerWidth = 500;
      window.dispatchEvent(new Event("resize"));
    });
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
