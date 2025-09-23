import { beforeEach, describe, it, expect, vi } from "vitest";
import { fireEvent, waitFor } from "@testing-library/react";

import { AccountPage } from "@pages/profile/account";
import { sampleColleges } from "@entities/majors";
import * as UserEntity from "@entities/user";
import * as AxiosAPI from "@shared/lib/axios";
import { renderWithProviders } from "@test-utils/renderer";

/**
 * 여기서는 유저가 로드 여부에 따라, 자식 컴포넌트들이 렌더링 되는지에 여부만 테스트한다.
 * 나머지 테스트는 각 컴포넌트별로 진행한다.
 */

describe("AccountPage", () => {
  beforeEach(() => {
    vi.spyOn(window, "alert").mockImplementation(() => {});
    vi.spyOn(UserEntity, "useUser").mockReturnValue({
      user: UserEntity.sampleUser,
      isAuthenticated: true,
    });
    vi.spyOn(AxiosAPI.axiosInstanceWithAuth, "get").mockResolvedValue({
      data: sampleColleges,
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

  it("handles update major success", async () => {
    const { getAllByText, getByTestId, queryByText } = renderWithProviders(
      <AccountPage />
    );

    fireEvent.click(getAllByText("변경하기")[0]); // 첫번째가 전공 변경 버튼

    await waitFor(() => {
      expect(getByTestId("update-major-form")).toBeInTheDocument();
    });

    fireEvent.change(getByTestId("college-select"), {
      target: { value: "2" },
    });
    fireEvent.change(getByTestId("department-select"), {
      target: { value: "3" },
    });

    // mock successful PUT request
    vi.spyOn(AxiosAPI.axiosInstanceWithAuth, "patch").mockResolvedValueOnce({
      data: {
        ...UserEntity.sampleUser.member,
        major: sampleColleges[1].departments[0],
      },
    });
    fireEvent.submit(getByTestId("update-major-form"));

    await waitFor(() => {
      expect(queryByText("전공 변경")).not.toBeInTheDocument();
    });
  });

  it("handles update dates successfully (with empty initial dates)", async () => {
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

    const { getAllByText, getByTestId, queryByText } = renderWithProviders(
      <AccountPage />
    );

    fireEvent.click(getAllByText("변경하기")[2]); // 세번째가 날짜 변경 버튼

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

    await waitFor(() => {
      expect(queryByText("기타 정보 변경")).not.toBeInTheDocument();
    });
  });
});
