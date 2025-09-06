import { describe, it, expect, beforeEach, vi } from "vitest";

import { AccountPage } from "@pages/profile/account";
import * as UserEntity from "@entities/user";
import { renderWithProviders } from "@test-utils/renderer";

describe("AccountPage", () => {
  beforeEach(() => {
    vi.spyOn(UserEntity, "useUser").mockReturnValue({
      user: UserEntity.sampleUser,
      isAuthenticated: true,
    });
  });

  it("doesn't render when user is null", () => {
    vi.spyOn(UserEntity, "useUser").mockReturnValue({
      user: null,
      isAuthenticated: false,
    });
    const { container } = renderWithProviders(<AccountPage />);
    expect(container).toBeEmptyDOMElement();
  });
});
