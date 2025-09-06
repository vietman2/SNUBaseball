import { describe, it, expect, beforeEach, vi } from "vitest";
import { fireEvent, waitFor } from "@testing-library/react";
import BareAxios from "axios";

import { AccountPage } from "@pages/profile/account";
import * as UserEntity from "@entities/user";
import { sampleColleges } from "@entities/majors";
import * as AxiosAPI from "@shared/lib/axios";
import {
  createTestQueryClient,
  renderWithProviders,
} from "@test-utils/renderer";

describe("AcademicsSection", () => {
  beforeEach(() => {
    vi.spyOn(BareAxios, "isAxiosError").mockReturnValue(true);
    vi.spyOn(window, "alert").mockImplementation(() => {});
    vi.spyOn(UserEntity, "useUser").mockReturnValue({
      user: UserEntity.sampleUser,
      isAuthenticated: true,
    });
    vi.spyOn(AxiosAPI.axiosInstanceWithAuth, "get").mockResolvedValue({
      data: sampleColleges,
    });
  });

  it("handles update major success", async () => {
    const { getByTestId, getByText, queryByText } = renderWithProviders(
      <AccountPage />
    );

    fireEvent.click(getByTestId("open-major-modal-button"));

    await waitFor(() => {
      expect(getByText("전공 변경")).toBeInTheDocument();
    });

    // test clicking inside modal
    fireEvent.mouseDown(getByTestId("modal-dialog"));

    await waitFor(() => {
      expect(getByText("전공 변경")).toBeInTheDocument();
    });

    // test clicking outside modal
    fireEvent.mouseDown(getByTestId("modal-overlay"));

    await waitFor(() => {
      expect(queryByText("전공 변경")).not.toBeInTheDocument();
    });

    // re-open and test closing with close button
    fireEvent.click(getByTestId("open-major-modal-button"));

    await waitFor(() => {
      expect(getByText("전공 변경")).toBeInTheDocument();
    });

    fireEvent.change(getByTestId("college-select"), {
      target: { value: "2" },
    });
    fireEvent.change(getByTestId("major-select"), {
      target: { value: "3" },
    });

    // mock successful PUT request
    vi.spyOn(AxiosAPI.axiosInstanceWithAuth, "patch").mockResolvedValueOnce({
      data: {
        ...UserEntity.sampleUser.member,
        major: sampleColleges[1].departments[0],
      },
    });
    fireEvent.click(getByTestId("submit-major-update-button"));

    await waitFor(() => {
      expect(queryByText("전공 변경")).not.toBeInTheDocument();
    });
  });

  it("handles update major success and replaces old data in query", async () => {
    vi.spyOn(UserEntity, "useUser").mockReturnValue({
      user: {
        ...UserEntity.sampleUser,
        member: {
          ...UserEntity.sampleUser.member,
          major: {
            id: 5,
            name: "비전공",
            short_name: "비전공",
            college: "비전공",
            college_id: 3,
          },
        },
      },
      isAuthenticated: true,
    });

    const sampleClient = createTestQueryClient();
    await sampleClient.setQueryData(["me"], UserEntity.sampleUser);

    const { getByTestId, getByText, queryByText } = renderWithProviders(
      <AccountPage />,
      { client: sampleClient }
    );

    fireEvent.click(getByTestId("open-major-modal-button"));

    await waitFor(() => {
      expect(getByText("전공 변경")).toBeInTheDocument();
    });

    fireEvent.change(getByTestId("college-select"), {
      target: { value: "2" },
    });
    fireEvent.change(getByTestId("major-select"), {
      target: { value: "3" },
    });

    // mock successful PUT request
    vi.spyOn(AxiosAPI.axiosInstanceWithAuth, "patch").mockResolvedValueOnce({
      data: {
        ...UserEntity.sampleUser.member,
        major: sampleColleges[1].departments[0],
      },
    });
    fireEvent.click(getByTestId("submit-major-update-button"));

    await waitFor(() => {
      expect(queryByText("전공 변경")).not.toBeInTheDocument();
    });

    const updatedUser = sampleClient.getQueryData(["me"]);
    expect(updatedUser).toEqual({
      ...UserEntity.sampleUser,
      member: {
        ...UserEntity.sampleUser.member,
        major: sampleColleges[1].departments[0],
      },
    });
  });

  it("handles update major fail (fetch colleges error)", async () => {
    vi.spyOn(AxiosAPI.axiosInstanceWithAuth, "get").mockRejectedValueOnce(
      new Error("API Error")
    );

    const { getByTestId } = renderWithProviders(<AccountPage />);

    fireEvent.click(getByTestId("open-major-modal-button"));

    await waitFor(() => {
      expect(window.alert).toHaveBeenCalledWith(
        "전공 정보를 불러오는 데 실패했습니다. 잠시 후 다시 시도해주세요."
      );
    });
  });

  it("handles update major fail (update major error)", async () => {
    // handles non-existent default major
    vi.spyOn(UserEntity, "useUser").mockReturnValue({
      user: {
        ...UserEntity.sampleUser,
        member: {
          ...UserEntity.sampleUser.member,
          major: {
            id: 5,
            name: "비전공",
            short_name: "비전공",
            college: "인문대학",
            college_id: 2,
          },
        },
      },
      isAuthenticated: true,
    });

    const { getByTestId, getByText } = renderWithProviders(<AccountPage />);

    fireEvent.click(getByTestId("open-major-modal-button"));

    await waitFor(() => {
      expect(getByText("전공 변경")).toBeInTheDocument();
    });

    // select non-existent options
    fireEvent.change(getByTestId("college-select"), {
      target: { value: "3" },
    });
    fireEvent.change(getByTestId("major-select"), {
      target: { value: "6" },
    });

    // known error
    vi.spyOn(AxiosAPI.axiosInstanceWithAuth, "patch").mockRejectedValueOnce({
      response: {
        data: {
          message: "이미 사용 중인 전공입니다.",
          status: "ERROR",
        },
      },
    });
    fireEvent.click(getByTestId("submit-major-update-button"));

    await waitFor(() => {
      expect(getByText("이미 사용 중인 전공입니다.")).toBeInTheDocument();
    });
  });
});
