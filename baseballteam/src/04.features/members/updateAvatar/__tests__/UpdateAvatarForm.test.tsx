import { beforeEach, describe, it, expect, vi } from "vitest";
import { fireEvent, waitFor } from "@testing-library/react";

import { UpdateAvatarForm } from "@features/members/updateAvatar";
import * as UserEntity from "@entities/user";
import * as AxiosAPI from "@shared/lib/axios";
import * as StorageAPI from "@shared/lib/storage";
import {
  createTestQueryClient,
  renderWithProviders,
} from "@test-utils/renderer";

describe("UpdateAvatarForm", () => {
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
    vi.spyOn(StorageAPI, "uploadToS3").mockResolvedValue();
    // 마지막으로 postUpload가 성공한다
    vi.spyOn(AxiosAPI.axiosInstanceWithAuth, "patch").mockResolvedValue({
      data: {
        url: "https://cdn.mocked-url.com/mocked-key",
      },
    });
  });

  it("handles update profile image success", async () => {
    const postUploadMock = vi.fn();

    const { getByTestId, getByText } = renderWithProviders(
      <UpdateAvatarForm
        memberId={1}
        postUpload={postUploadMock}
        originalImageUrl="https://cdn.mocked-url.com/mocked-key"
      />
    );

    // test file upload
    fireEvent.click(getByTestId("file-input"));
    fireEvent.click(getByText("업로드"));

    await waitFor(() => {
      expect(postUploadMock).toHaveBeenCalled();
    });
  });

  it("handles update profile image fail (api errors + null initial image)", async () => {
    vi.spyOn(AxiosAPI.axiosInstanceWithAuth, "post").mockRejectedValueOnce(
      new Error("API Error")
    );

    const { getByTestId, getByText } = renderWithProviders(
      <UpdateAvatarForm
        memberId={1}
        postUpload={vi.fn()}
        originalImageUrl={null}
      />
    );

    // 첫 시도때는 Presigned URL을 가져오는데 실패
    fireEvent.click(getByTestId("file-input"));
    fireEvent.click(getByText("업로드"));

    await waitFor(() => {
      expect(
        getByText("Presigned URL을 가져오는데 실패했습니다.")
      ).toBeInTheDocument();
    });

    // 두번째 시도때는 S3 업로드에 실패
    vi.spyOn(StorageAPI, "uploadToS3").mockRejectedValueOnce(
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

  it("handles update profile image success and replaces old data in query", async () => {
    const sampleClient = createTestQueryClient();
    await sampleClient.setQueryData(["me"], UserEntity.sampleUser);

    const postUploadMock = vi.fn();

    const { getByTestId, getByText } = renderWithProviders(
      <UpdateAvatarForm
        memberId={1}
        postUpload={postUploadMock}
        originalImageUrl="https://cdn.mocked-url.com/mocked-key"
      />,
      { client: sampleClient }
    );

    fireEvent.click(getByTestId("file-input"));
    fireEvent.click(getByText("업로드"));

    await waitFor(() => {
      expect(postUploadMock).toHaveBeenCalled();
    });
  });
});
