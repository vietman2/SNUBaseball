import { beforeEach, describe, expect, it, vi } from "vitest";
import { fireEvent, waitFor } from "@testing-library/react";

import { ManageTags } from "@pages/gallery/admin";
import * as TagEntity from "@entities/gallery/tags";
import * as AxiosAPI from "@shared/lib/axios";
import {
  createTestQueryClient,
  renderWithProviders,
} from "@test-utils/renderer";

describe("ManageTags", () => {
  beforeEach(() => {
    vi.spyOn(window, "alert").mockImplementation(() => {});
    vi.spyOn(window, "confirm").mockImplementation(() => true);
    vi.spyOn(TagEntity, "useTags").mockReturnValue({
      tags: TagEntity.sampleTags,
      selectedTags: [],
      refresh: vi.fn(),
      isLoading: false,
      isError: false,
    });
  });

  describe("Create", () => {
    it("handles create new tag correctly", async () => {
      const { getByTestId, getByText, queryByTestId } = renderWithProviders(
        <ManageTags />
      );
      expect(getByText("태그 관리")).toBeInTheDocument();

      fireEvent.click(getByText("+"));

      await waitFor(() => {
        expect(getByTestId("tag-form")).toBeInTheDocument();
      });

      // 폼을 채운다
      fireEvent.change(getByTestId("tag-name-input"), {
        target: { value: "새 태그" },
      });

      // 생성 요청
      vi.spyOn(AxiosAPI.axiosInstanceWithAuth, "post").mockResolvedValue({
        data: {
          id: 999,
          name: "새 태그",
          color: "#000000",
        },
      });
      fireEvent.click(getByTestId("submit-tag"));

      await waitFor(() => {
        expect(queryByTestId("submit-tag")).not.toBeInTheDocument();
      });
    });

    it("handles create fail, then success with existing query", async () => {
      const queryClient = createTestQueryClient();
      queryClient.setQueryData<TagEntity.MediaTagType[]>(
        ["tags"],
        TagEntity.sampleTags
      );

      const { getByTestId, getByText, queryByTestId } = renderWithProviders(
        <ManageTags />,
        {
          client: queryClient,
        }
      );

      fireEvent.click(getByText("+"));

      // 태그 제목이 비어있을 때 제출을 시도하면, 아무일도 일어나지 않는다.
      fireEvent.change(getByTestId("tag-name-input"), {
        target: { value: "" },
      });
      fireEvent.submit(getByTestId("tag-form"));

      // 폼을 채우고 다시 시도
      fireEvent.change(getByTestId("tag-name-input"), {
        target: { value: "새 태그" },
      });

      // 생성 요청 (실패)
      vi.spyOn(AxiosAPI.axiosInstanceWithAuth, "post").mockRejectedValue({
        response: {
          data: {
            message: "태그 생성 실패",
          },
        },
      });
      fireEvent.click(getByTestId("submit-tag"));

      await waitFor(() => {
        expect(getByText("Sample Error Message")).toBeInTheDocument();
      });

      // 재시도 (성공)
      vi.spyOn(AxiosAPI.axiosInstanceWithAuth, "post").mockResolvedValue({
        data: {
          id: 999,
          name: "새 태그",
          color: "#000000",
        },
      });
      fireEvent.click(getByTestId("submit-tag"));

      await waitFor(() => {
        expect(queryByTestId("submit-tag")).not.toBeInTheDocument();
      });
    });
  });

  describe("Update", () => {
    it("handles update tag correctly", async () => {
      const { getByTestId, getByText, queryByTestId } = renderWithProviders(
        <ManageTags />
      );
      expect(getByText("태그 관리")).toBeInTheDocument();

      fireEvent.click(getByTestId("tag-badge-1"));
      fireEvent.click(getByTestId("edit-button-1"));

      await waitFor(() => {
        expect(getByTestId("tag-form")).toBeInTheDocument();
      });

      // 폼을 채운다
      fireEvent.change(getByTestId("tag-name-input"), {
        target: { value: "수정된 태그" },
      });

      // 수정 요청
      vi.spyOn(AxiosAPI.axiosInstanceWithAuth, "put").mockResolvedValue({
        data: {
          id: 1,
          name: "수정된 태그",
          color: "#000000",
        },
      });
      fireEvent.click(getByTestId("submit-tag"));

      await waitFor(() => {
        expect(queryByTestId("submit-tag")).not.toBeInTheDocument();
      });
    });

    it("handles update fail, then success with existing query", async () => {
      const queryClient = createTestQueryClient();
      queryClient.setQueryData<TagEntity.MediaTagType[]>(
        ["tags"],
        TagEntity.sampleTags
      );

      const { getByTestId, getByText, queryByTestId } = renderWithProviders(
        <ManageTags />,
        {
          client: queryClient,
        }
      );

      fireEvent.click(getByTestId("tag-badge-1"));
      fireEvent.click(getByTestId("edit-button-1"));

      await waitFor(() => {
        expect(getByTestId("tag-form")).toBeInTheDocument();
      });

      // 태그 제목이 비어있을 때 제출을 시도하면, 아무일도 일어나지 않는다.
      fireEvent.change(getByTestId("tag-name-input"), {
        target: { value: "" },
      });
      fireEvent.submit(getByTestId("tag-form"));

      // 폼을 채우고 다시 시도
      fireEvent.change(getByTestId("tag-name-input"), {
        target: { value: "수정된 태그" },
      });

      // 수정 요청 (실패)
      vi.spyOn(AxiosAPI.axiosInstanceWithAuth, "put").mockRejectedValue({
        response: {
          data: {
            message: "태그 수정 실패",
          },
        },
      });
      fireEvent.click(getByTestId("submit-tag"));

      await waitFor(() => {
        expect(getByText("Sample Error Message")).toBeInTheDocument();
      });

      // 재시도 (성공)
      vi.spyOn(AxiosAPI.axiosInstanceWithAuth, "put").mockResolvedValue({
        data: {
          id: 1,
          name: "수정된 태그",
          color: "#000000",
        },
      });
      fireEvent.click(getByTestId("submit-tag"));

      await waitFor(() => {
        expect(queryByTestId("submit-tag")).not.toBeInTheDocument();
      });
    });
  });

  describe("Delete", () => {
    it("handles delete tag correctly", async () => {
      const { getByTestId, getByText } = renderWithProviders(<ManageTags />);
      expect(getByText("태그 관리")).toBeInTheDocument();

      fireEvent.click(getByTestId("tag-badge-1"));
      fireEvent.click(getByTestId("delete-tag-1"));

      // 삭제 요청
      vi.spyOn(AxiosAPI.axiosInstanceWithAuth, "delete").mockResolvedValue({
        data: {},
      });

      await waitFor(() => {
        expect(window.alert).toHaveBeenCalledWith(
          "태그가 성공적으로 삭제되었습니다."
        );
      });
    });

    it("handles delete fail, then success with existing query", async () => {
      const queryClient = createTestQueryClient();
      queryClient.setQueryData<TagEntity.MediaTagType[]>(
        ["tags"],
        TagEntity.sampleTags
      );

      const { getByTestId } = renderWithProviders(<ManageTags />, {
        client: queryClient,
      });

      // 삭제 요청 취소
      vi.spyOn(window, "confirm").mockImplementationOnce(() => false);

      fireEvent.click(getByTestId("tag-badge-2"));
      fireEvent.click(getByTestId("delete-tag-2"));

      await waitFor(() => {
        expect(AxiosAPI.axiosInstanceWithAuth.delete).not.toHaveBeenCalledWith(
          "/api/v1/gallery/tags/2/"
        );
      });

      // 삭제 요청 (실패)
      vi.spyOn(AxiosAPI.axiosInstanceWithAuth, "delete").mockRejectedValueOnce({
        response: {
          data: {
            message: "태그 삭제 실패",
          },
        },
      });

      fireEvent.click(getByTestId("tag-badge-2"));
      fireEvent.click(getByTestId("delete-tag-2"));

      await waitFor(() => {
        expect(window.alert).toHaveBeenCalledWith("Sample Error Message");
      });

      // 재시도 (성공)
      vi.spyOn(AxiosAPI.axiosInstanceWithAuth, "delete").mockResolvedValue({
        data: {},
      });

      fireEvent.click(getByTestId("tag-badge-2"));
      fireEvent.click(getByTestId("delete-tag-2"));

      await waitFor(() => {
        expect(window.alert).toHaveBeenCalledWith(
          "태그가 성공적으로 삭제되었습니다."
        );
      });
    });

    it("handles delete tag with no linked media", async () => {
      const { getByTestId } = renderWithProviders(<ManageTags />);

      fireEvent.click(getByTestId("tag-badge-4"));
      fireEvent.click(getByTestId("delete-tag-4"));

      // 삭제 요청
      vi.spyOn(AxiosAPI.axiosInstanceWithAuth, "delete").mockResolvedValue({
        data: {},
      });

      await waitFor(() => {
        expect(window.confirm).not.toHaveBeenCalled();
        expect(window.alert).toHaveBeenCalledWith(
          "태그가 성공적으로 삭제되었습니다."
        );
      });
    });
  });
});
