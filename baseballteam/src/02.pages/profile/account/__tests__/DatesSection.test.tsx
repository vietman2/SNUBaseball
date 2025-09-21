import { beforeEach, describe, it, expect, vi } from "vitest";
import { fireEvent, waitFor } from "@testing-library/react";

import { AccountPage } from "@pages/profile/account";
import * as UserEntity from "@entities/user";
import * as AxiosAPI from "@shared/lib/axios";
import { renderWithProviders } from "@test-utils/renderer";

// 나머지 컴포넌트들은 mocking
vi.mock("../ui/AcademicsSection", () => ({
  AcademicsSection: () => <div>AcademicsSection</div>,
}));
vi.mock("../ui/AvatarSection", () => ({
  AvatarSection: () => <div>AvatarSection</div>,
}));
vi.mock("../ui/ContactsSection", () => ({
  ContactsSection: () => <div>ContactsSection</div>,
}));

describe("ContactsSection", () => {
  beforeEach(() => {
    vi.spyOn(UserEntity, "useUser").mockReturnValue({
      user: UserEntity.sampleUser,
      isAuthenticated: true,
    });
  });

  it("handles update dates successfully", async () => {
    const { getByTestId, getByText, queryByText } = renderWithProviders(
      <AccountPage />
    );

    fireEvent.click(getByText("변경하기"));

    await waitFor(() => {
      expect(queryByText("기타 정보 변경")).toBeInTheDocument();
    });

    // 날짜 변경하기
    fireEvent.change(getByTestId("birth-date-input"), {
      target: { value: "1999-09-09" },
    });
    fireEvent.change(getByTestId("join-date-input"), {
      target: { value: "2020-03-02" },
    });

    vi.spyOn(AxiosAPI.axiosInstanceWithAuth, "patch").mockResolvedValueOnce({
      data: {
        ...UserEntity.sampleUser.member,
        birth_date: "1999-09-09",
        date_joined: "2020-03-02",
      },
    });
    fireEvent.submit(getByTestId("update-dates-form"));
  });

  it("handles null initial dates", async () => {
    vi.spyOn(UserEntity, "useUser").mockReturnValue({
      user: {
        ...UserEntity.sampleUser,
        member: {
          ...UserEntity.sampleUser.member,
          birth_date: null,
          date_joined: null,
        },
      },
      isAuthenticated: true,
    });

    const { getAllByText, getByText } = renderWithProviders(
      <AccountPage />
    );

    fireEvent.click(getByText("변경하기"));

    await waitFor(() => {
      expect(getAllByText("-").length).toBe(2);
    });
  });
});
