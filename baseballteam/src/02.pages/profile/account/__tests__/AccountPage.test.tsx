import { describe, it, expect, beforeEach, vi } from "vitest";

import { AccountPage } from "@pages/profile/account";
import * as UserEntity from "@entities/user";
import { renderWithProviders } from "@test-utils/renderer";

/**
 * 여기서는 유저가 로드 여부에 따라, 자식 컴포넌트들이 렌더링 되는지에 여부만 테스트한다.
 * 나머지 테스트는 각 컴포넌트별로 진행한다.
 */

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

  it("renders correctly when user is present", () => {
    const { getByText } = renderWithProviders(<AccountPage />);

    // Avatar Section
    expect(getByText("프로필")).toBeInTheDocument();
    expect(getByText("김선수")).toBeInTheDocument();

    // Academics Section
    expect(getByText("컴퓨터공학과")).toBeInTheDocument();

    // Contacts Section
    expect(getByText("휴대폰")).toBeInTheDocument();
    expect(getByText("010-1234-5678")).toBeInTheDocument();

    // Dates Section
    expect(getByText("생년월일")).toBeInTheDocument();
    expect(getByText("2003-05-15")).toBeInTheDocument();
    expect(getByText("야구부 입부일")).toBeInTheDocument();
    expect(getByText("2023-03-01")).toBeInTheDocument();
  });
});
