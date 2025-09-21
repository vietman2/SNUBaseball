import { describe, it, expect, beforeEach, vi } from "vitest";
import { fireEvent, waitFor } from "@testing-library/react";
import BareAxios from "axios";

import { AccountPage } from "@pages/profile/account";
import * as UserEntity from "@entities/user";
import * as AxiosAPI from "@shared/lib/axios";
import {
  createTestQueryClient,
  renderWithProviders,
} from "@test-utils/renderer";

// 나머지 컴포넌트들은 mocking
vi.mock("../ui/AcademicsSection", () => ({
  AcademicsSection: () => <div>AcademicsSection</div>,
}));
vi.mock("../ui/ContactsSection", () => ({
  ContactsSection: () => <div>ContactsSection</div>,
}));
vi.mock("../ui/DatesSection", () => ({
  DatesSection: () => <div>DatesSection</div>,
}));

describe("AvatarSection", () => {
  beforeEach(() => {
    // 가장 먼저 getPresignedUrl이 성공한다
    vi.spyOn(AxiosAPI.axiosInstanceWithAuth, "post").mockResolvedValue({
      data: {
        url: "https://s3.mocked-url.com/upload",
        fields: {
          key: "mocked-key",
          policy: "mocked-policy",
        },
      },
    });
    // 그 다음 uploadToS3가 성공한다
    vi.spyOn(BareAxios, "post").mockResolvedValue({
      status: 204,
    });
    // 마지막으로 postUpload가 성공한다
    vi.spyOn(AxiosAPI.axiosInstanceWithAuth, "patch").mockResolvedValue({
      data: {
        url: "https://cdn.mocked-url.com/mocked-key",
      },
    });
    vi.spyOn(UserEntity, "useUser").mockReturnValue({
      user: UserEntity.sampleUser,
      isAuthenticated: true,
    });
  });

  it("handles update profile image success", async () => {
    const { getByTestId, getByText, queryByText } = renderWithProviders(
      <AccountPage />
    );
    expect(getByText("프로필")).toBeInTheDocument();

    fireEvent.click(getByTestId("avatar-edit-button"));

    await waitFor(() => {
      expect(getByText("프로필 이미지 변경")).toBeInTheDocument();
    });

    // test clicking inside modal
    fireEvent.mouseDown(getByTestId("modal-dialog"));

    await waitFor(() => {
      expect(getByText("프로필 이미지 변경")).toBeInTheDocument();
    });

    // test clicking outside modal
    fireEvent.mouseDown(getByTestId("modal-overlay"));

    await waitFor(() => {
      expect(queryByText("프로필 이미지 변경")).not.toBeInTheDocument();
    });

    // re-open and test file upload
    fireEvent.click(getByTestId("avatar-edit-button"));
    fireEvent.click(getByTestId("file-input"));
    fireEvent.click(getByText("업로드"));

    await waitFor(() => {
      expect(queryByText("프로필 이미지 변경")).not.toBeInTheDocument();
    });
  });

  it("handles update profile image success and replaces old data in query", async () => {
    const sampleClient = createTestQueryClient();
    await sampleClient.setQueryData(["me"], UserEntity.sampleUser);

    const { getByTestId, getByText, queryByText } = renderWithProviders(
      <AccountPage />,
      { client: sampleClient }
    );

    fireEvent.click(getByTestId("avatar-edit-button"));
    fireEvent.click(getByTestId("file-input"));
    fireEvent.click(getByText("업로드"));

    await waitFor(() => {
      expect(queryByText("프로필 이미지 변경")).not.toBeInTheDocument();
    });
  });

  it("handles update profile image fail (empty input)", async () => {
    vi.spyOn(UserEntity, "useUser").mockReturnValue({
      user: {
        ...UserEntity.sampleUser,
        member: {
          ...UserEntity.sampleUser.member,
          profile_image: null,
        },
      },
      isAuthenticated: true,
    });

    const { getByTestId, getByText } = renderWithProviders(<AccountPage />);
    expect(getByText("프로필")).toBeInTheDocument();

    fireEvent.click(getByTestId("avatar-edit-button"));

    fireEvent.click(getByText("업로드"));

    await waitFor(() => {
      expect(getByText("업로드할 파일을 선택해주세요.")).toBeInTheDocument();
    });
  });

  it("handles update profile image fail (api errors)", async () => {
    vi.spyOn(AxiosAPI.axiosInstanceWithAuth, "post").mockRejectedValueOnce(
      new Error("API Error")
    );

    const { getByTestId, getByText } = renderWithProviders(<AccountPage />);

    // 첫 시도때는 Presigned URL을 가져오는데 실패
    fireEvent.click(getByTestId("avatar-edit-button"));
    fireEvent.click(getByTestId("file-input"));
    fireEvent.click(getByText("업로드"));

    await waitFor(() => {
      expect(
        getByText("Presigned URL을 가져오는데 실패했습니다.")
      ).toBeInTheDocument();
    });

    // 두번째 시도때는 S3 업로드에 실패
    vi.spyOn(BareAxios, "post").mockRejectedValueOnce(
      new Error("S3 Upload Error")
    );
    fireEvent.click(getByText("업로드"));

    await waitFor(() => {
      expect(getByText("S3 업로드에 실패했습니다.")).toBeInTheDocument();
    });

    // 세번째 시도때는 업로드 완료 처리에 실패
    vi.spyOn(AxiosAPI.axiosInstanceWithAuth, "patch").mockRejectedValueOnce(
      new Error("Post Upload Error")
    );
    fireEvent.click(getByText("업로드"));

    await waitFor(() => {
      expect(getByText("업로드 완료 처리에 실패했습니다.")).toBeInTheDocument();
    });
  });
});
