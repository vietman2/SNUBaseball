import { describe, it, expect, beforeEach, vi } from "vitest";
import { fireEvent, waitFor } from "@testing-library/react";
import BareAxios from "axios";

import { AccountPage } from "@pages/profile/account";
import { sampleColleges } from "@entities/majors";
import * as UserEntity from "@entities/user";
import * as AxiosAPI from "@shared/lib/axios";
import {
  createTestQueryClient,
  renderWithProviders,
} from "@test-utils/renderer";

describe("AccountPage", () => {
  beforeEach(() => {
    vi.spyOn(BareAxios, "isAxiosError").mockReturnValue(true);
    vi.spyOn(window, "alert").mockImplementation(() => {});
    vi.spyOn(UserEntity, "useUser").mockReturnValue({
      user: UserEntity.sampleUser,
      isAuthenticated: true,
    });
  });

  describe("UploadImageModal", () => {
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
      vi.spyOn(AxiosAPI.axiosInstanceWithAuth, "put").mockResolvedValue({
        data: {
          url: "https://cdn.mocked-url.com/mocked-key",
        },
      });
    });

    it("handles update profile image success", async () => {
      const { getByTestId, getByText, queryByText } = renderWithProviders(
        <AccountPage />
      );
      expect(getByText("프로필")).toBeInTheDocument();

      fireEvent.click(getByTestId("open-avatar-modal-button"));

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
      fireEvent.click(getByTestId("open-avatar-modal-button"));
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

      fireEvent.click(getByTestId("open-avatar-modal-button"));
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

      fireEvent.click(getByTestId("open-avatar-modal-button"));

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
      fireEvent.click(getByTestId("open-avatar-modal-button"));
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
      vi.spyOn(AxiosAPI.axiosInstanceWithAuth, "put").mockRejectedValueOnce(
        new Error("Post Upload Error")
      );
      fireEvent.click(getByText("업로드"));

      await waitFor(() => {
        expect(
          getByText("업로드 완료 처리에 실패했습니다.")
        ).toBeInTheDocument();
      });
    });
  });

  describe("UpdateMajorModal", () => {
    beforeEach(() => {
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

  describe("UpdateContactsModal", () => {
    it("handles update contacts success", async () => {
      const { getByTestId, getByText, queryByText, getByLabelText } =
        renderWithProviders(<AccountPage />);

      fireEvent.click(getByTestId("open-contacts-modal-button"));

      await waitFor(() => {
        expect(getByText("연락처 변경")).toBeInTheDocument();
      });

      // test clicking inside modal
      fireEvent.mouseDown(getByTestId("modal-dialog"));

      await waitFor(() => {
        expect(getByText("연락처 변경")).toBeInTheDocument();
      });

      // test clicking outside modal
      fireEvent.mouseDown(getByTestId("modal-overlay"));

      await waitFor(() => {
        expect(queryByText("연락처 변경")).not.toBeInTheDocument();
      });

      // re-open and test closing with close button
      fireEvent.click(getByTestId("open-contacts-modal-button"));

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

      fireEvent.click(getByTestId("open-contacts-modal-button"));

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
        expect(
          getByText("프로필 업데이트에 실패했습니다. 잠시 후 다시 시도해주세요.")
        ).toBeInTheDocument();
      });
    });
  });
});
