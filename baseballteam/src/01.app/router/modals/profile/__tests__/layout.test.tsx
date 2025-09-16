import { describe, expect, it } from "vitest";

import { ProfileLayout } from "../layout";
import { renderWithProviders } from "@test-utils/renderer";

describe("ProfileLayout", () => {
  it("should render", () => {
    const { getByText } = renderWithProviders(<ProfileLayout />);

    expect(getByText("내 프로필")).toBeInTheDocument();
    expect(getByText("계정")).toBeInTheDocument();
    expect(getByText("로그아웃")).toBeInTheDocument();
  });
});
