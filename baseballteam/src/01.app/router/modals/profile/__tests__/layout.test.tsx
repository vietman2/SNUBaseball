import { beforeAll, describe, expect, it, vi } from "vitest";

import { ProfileLayout } from "../layout";
import * as RouterAPI from "@shared/lib/router";
import { renderWithProviders } from "@test-utils/renderer";

describe("ProfileLayout", () => {
  const sampleLocation = {
    pathname: "/profile/account",
    search: "",
    hash: "",
    key: "",
    state: null,
  };

  beforeAll(() => {
    vi.spyOn(RouterAPI, "useRouter").mockReturnValue({
      backgroundLocation: sampleLocation,
      displayLocation: sampleLocation,
      isModal: true,
    });
  });

  it("should render correctly", () => {
    const { getByText } = renderWithProviders(<ProfileLayout />);

    expect(getByText("내 프로필")).toBeInTheDocument();
    expect(getByText("계정")).toBeInTheDocument();
    expect(getByText("로그아웃")).toBeInTheDocument();
  });
});
