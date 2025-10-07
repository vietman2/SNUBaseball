import { beforeEach, describe, expect, it, vi } from "vitest";
import { fireEvent, waitFor } from "@testing-library/react";

import { ManageAlbums } from "@pages/gallery/admin";
import * as AlbumEntity from "@entities/gallery/album";
import * as AxiosAPI from "@shared/lib/axios";
import {
  createTestQueryClient,
  renderWithProviders,
} from "@test-utils/renderer";

describe("ManageAlbums", () => {
  beforeEach(() => {
    vi.spyOn(window, "alert").mockImplementation(() => {});
    vi.spyOn(window, "confirm").mockImplementation(() => true);
    vi.spyOn(AlbumEntity, "useAlbums").mockReturnValue({
      albums: AlbumEntity.sampleAlbums,
      selectedAlbum: null,
      refresh: vi.fn(),
      isLoading: false,
      isError: false,
    });
  });

  describe("Create", () => {
    it("handles create new album correctly", async () => {
      const { getByTestId, getByText, queryByTestId } = renderWithProviders(
        <ManageAlbums />
      );
      expect(getByText("앨범 관리")).toBeInTheDocument();

      fireEvent.click(getByText("새 앨범 추가"));

      await waitFor(() => {
        expect(getByTestId("album-form")).toBeInTheDocument();
      });

      // 폼을 채운다
      fireEvent.change(getByTestId("album-title-input"), {
        target: { value: "새 앨범" },
      });

      // 생성 요청
      vi.spyOn(AxiosAPI.axiosInstanceWithAuth, "post").mockResolvedValue({
        data: {
          id: 999,
          title: "새 앨범",
          members_only: false,
          color: "#000000",
          cover_image_url: "",
          num_images: 0,
          num_videos: 0,
        },
      });
      fireEvent.click(getByTestId("submit-album"));

      await waitFor(() => {
        expect(queryByTestId("submit-album")).not.toBeInTheDocument();
      });
    });

    it("handles create new album fail first, then success with existing query correctly", async () => {
      const queryClient = createTestQueryClient();
      queryClient.setQueryData(["albums"], AlbumEntity.sampleAlbums);

      const { getByTestId, getByText, queryByTestId } = renderWithProviders(
        <ManageAlbums />,
        { client: queryClient }
      );

      fireEvent.click(getByText("새 앨범 추가"));
      // 제목이 비어있으면 제출 안됨
      fireEvent.change(getByTestId("album-title-input"), {
        target: { value: "" },
      });
      fireEvent.submit(getByTestId("album-form"));

      fireEvent.change(getByTestId("album-title-input"), {
        target: { value: "새 앨범 2" },
      });
      fireEvent.click(getByTestId("memberonly-checkbox"));

      vi.spyOn(AxiosAPI.axiosInstanceWithAuth, "post").mockRejectedValue(
        new Error("Network Error")
      );
      fireEvent.click(getByTestId("submit-album"));

      await waitFor(() => {
        expect(getByText("Sample Error Message")).toBeInTheDocument();
      });

      // 생성 요청
      vi.spyOn(AxiosAPI.axiosInstanceWithAuth, "post").mockResolvedValue({
        data: {
          id: 500,
          title: "새 앨범 2",
          members_only: false,
          color: "#ffffff",
          cover_image_url: "",
          num_images: 0,
          num_videos: 0,
        },
      });
      fireEvent.click(getByTestId("submit-album"));

      await waitFor(() => {
        expect(queryByTestId("submit-album")).not.toBeInTheDocument();
      });
    });
  });

  describe("Edit", () => {
    it("handles edit album correctly", async () => {
      const { getByTestId, getByText, queryByTestId } = renderWithProviders(
        <ManageAlbums />
      );
      expect(getByText("앨범 관리")).toBeInTheDocument();

      fireEvent.click(getByTestId("edit-button-1"));

      await waitFor(() => {
        expect(getByTestId("album-form")).toBeInTheDocument();
      });

      // 폼을 채운다
      expect(getByTestId("album-title-input")).toHaveValue(
        AlbumEntity.sampleAlbums[0].title
      );
      fireEvent.change(getByTestId("album-title-input"), {
        target: { value: "수정된 앨범" },
      });

      // 수정 요청
      vi.spyOn(AxiosAPI.axiosInstanceWithAuth, "put").mockResolvedValue({
        data: {
          id: 1,
          title: "수정된 앨범",
          members_only: true,
          color: "#ff0000",
          cover_image_url: "",
          num_images: 10,
          num_videos: 5,
        },
      });
      fireEvent.click(getByTestId("submit-album"));

      await waitFor(() => {
        expect(queryByTestId("submit-album")).not.toBeInTheDocument();
      });
    });

    it("handles edit album fail first, then success with existing query correctly", async () => {
      const queryClient = createTestQueryClient();
      queryClient.setQueryData(["albums"], AlbumEntity.sampleAlbums);

      const { getByTestId, getByText, queryByTestId } = renderWithProviders(
        <ManageAlbums />,
        { client: queryClient }
      );

      fireEvent.click(getByTestId("edit-button-1"));
      await waitFor(() => {
        expect(getByTestId("album-form")).toBeInTheDocument();
      });

      // 제목이 비어있으면 제출 안됨
      fireEvent.change(getByTestId("album-title-input"), {
        target: { value: "" },
      });
      fireEvent.submit(getByTestId("album-form"));

      fireEvent.change(getByTestId("album-title-input"), {
        target: { value: "수정된 앨범 2" },
      });
      fireEvent.click(getByTestId("memberonly-checkbox"));

      vi.spyOn(AxiosAPI.axiosInstanceWithAuth, "put").mockRejectedValue(
        new Error("Network Error")
      );
      fireEvent.click(getByTestId("submit-album"));

      await waitFor(() => {
        expect(getByText("Sample Error Message")).toBeInTheDocument();
      });

      // 수정 요청
      vi.spyOn(AxiosAPI.axiosInstanceWithAuth, "put").mockResolvedValue({
        data: {
          id: 1,
          title: "수정된 앨범 2",
          members_only: true,
          color: "#ff0000",
          cover_image_url: "",
          num_images: 10,
          num_videos: 5,
        },
      });
      fireEvent.click(getByTestId("submit-album"));

      await waitFor(() => {
        expect(queryByTestId("submit-album")).not.toBeInTheDocument();
      });
    });
  });

  describe("Delete", () => {
    it("handles delete album correctly", async () => {
      const { getByTestId, getByText } = renderWithProviders(<ManageAlbums />);
      expect(getByText("앨범 관리")).toBeInTheDocument();

      // 미디어가 있는 앨범을 삭제하려 하면, 경고창이 뜬다
      fireEvent.click(getByTestId("delete-button-1"));

      await waitFor(() => {
        expect(window.alert).toHaveBeenCalledWith(
          "앨범에 사진이나 영상이 포함되어 있어 삭제할 수 없습니다."
        );
      });

      // 미디어가 없는 앨범을 삭제한다
      fireEvent.click(getByTestId("delete-button-2"));
      vi.spyOn(AxiosAPI.axiosInstanceWithAuth, "delete").mockResolvedValue({
        data: {},
      });

      await waitFor(() => {
        expect(window.alert).toHaveBeenCalledWith(
          '"빈 앨범" 앨범이 삭제되었습니다.'
        );
      });
    });

    it("handles delete album fail, then success with existing query correctly", async () => {
      const queryClient = createTestQueryClient();
      queryClient.setQueryData(["albums"], AlbumEntity.sampleAlbums);

      const { getByTestId, getByText } = renderWithProviders(<ManageAlbums />, {
        client: queryClient,
      });
      expect(getByText("앨범 관리")).toBeInTheDocument();

      // 미디어가 없는 앨범을 삭제한다
      fireEvent.click(getByTestId("delete-button-2"));
      // 유저가 삭제를 취소하는 경우 한번 테스트
      vi.spyOn(window, "confirm").mockImplementationOnce(() => false);

      // 다시 삭제 시도
      fireEvent.click(getByTestId("delete-button-2"));
      vi.spyOn(AxiosAPI.axiosInstanceWithAuth, "delete").mockRejectedValueOnce(
        new Error("Network Error")
      );

      await waitFor(() => {
        expect(window.alert).toHaveBeenCalledWith("Sample Error Message");
      });

      // 다시 삭제 시도
      fireEvent.click(getByTestId("delete-button-2"));
      vi.spyOn(AxiosAPI.axiosInstanceWithAuth, "delete").mockResolvedValue({
        data: {},
      });

      await waitFor(() => {
        expect(window.alert).toHaveBeenCalledWith(
          '"빈 앨범" 앨범이 삭제되었습니다.'
        );
      });
    });
  });
});
