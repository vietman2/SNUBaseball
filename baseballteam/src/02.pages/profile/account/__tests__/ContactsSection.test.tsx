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
vi.mock("../ui/DatesSection", () => ({
  DatesSection: () => <div>DatesSection</div>,
}));

describe("ContactsSection", () => {
  beforeEach(() => {
    vi.spyOn(UserEntity, "useUser").mockReturnValue({
      user: UserEntity.sampleUser,
      isAuthenticated: true,
    });
  });

  it("handles update contacts success", async () => {
    const { getByTestId, getByText, queryByText, getByLabelText } =
      renderWithProviders(<AccountPage />);

    // re-open and test closing with close button
    fireEvent.click(getByText("변경하기"));

    await waitFor(() => {
      expect(getByText("연락처 변경")).toBeInTheDocument();
    });

    // do nothing when no changes made
    fireEvent.submit(getByTestId("update-contacts-form"));

    fireEvent.change(getByLabelText("휴대폰 번호"), {
      target: { value: "010-9999-8888" },
    });
    fireEvent.change(getByLabelText("이메일"), {
      target: { value: "test@example.com" },
    });
    fireEvent.change(getByLabelText("주소"), {
      target: { value: "서울시 광진구 화양동" },
    });

    // mock successful PUT request
    vi.spyOn(AxiosAPI.axiosInstanceWithAuth, "patch").mockResolvedValueOnce({
      data: {
        ...UserEntity.sampleUser.member,
        phone: "010-9999-8888",
        email: "test@example.com",
        address: "서울시 광진구 화양동",
      },
    });

    fireEvent.click(getByTestId("submit-contacts-update-button"));

    await waitFor(() => {
      expect(queryByText("연락처 변경")).not.toBeInTheDocument();
    });
  });

  it("handles update contacts fail (update contacts error)", async () => {
    // no initial contacts
    vi.spyOn(UserEntity, "useUser").mockReturnValue({
      user: {
        ...UserEntity.sampleUser,
        member: {
          ...UserEntity.sampleUser.member,
          phone: null,
          email: null,
          address: null,
        },
      },
      isAuthenticated: true,
    });
    const { getByTestId, getByText, getByLabelText } = renderWithProviders(
      <AccountPage />
    );

    fireEvent.click(getByText("변경하기"));

    await waitFor(() => {
      expect(getByText("연락처 변경")).toBeInTheDocument();
    });

    fireEvent.change(getByLabelText("휴대폰 번호"), {
      target: { value: "010-9999-8888" },
    });

    // unknown error
    vi.spyOn(AxiosAPI.axiosInstanceWithAuth, "patch").mockRejectedValueOnce(
      new Error("API Error")
    );
    fireEvent.click(getByTestId("submit-contacts-update-button"));

    await waitFor(() => {
      expect(getByText("Sample Error Message")).toBeInTheDocument();
    });
  });
});
