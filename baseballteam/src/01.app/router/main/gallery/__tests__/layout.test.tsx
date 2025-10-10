import { beforeEach, describe, expect, it, vi } from "vitest";
import { fireEvent, waitFor } from "@testing-library/react";
import * as Router from "react-router";

import { GalleryLayout } from "../layout";
import { sampleAlbums } from "@entities/gallery/album";
import { sampleTags } from "@entities/gallery/tags";
import {
  sampleGalleryImage,
  sampleGalleryVideo,
} from "@entities/gallery/media";
import * as UserEntity from "@entities/user";
import * as AxiosAPI from "@shared/lib/axios";
import * as ViewsAPI from "@shared/lib/views";
import { renderWithProviders } from "@test-utils/renderer";

describe("GalleryLayout", () => {
  beforeEach(() => {
    vi.spyOn(AxiosAPI.axiosInstanceWithAuth, "get").mockImplementation(
      (url) => {
        if (url.includes("albums/")) {
          return Promise.resolve({ data: sampleAlbums });
        } else if (url.includes("tags/")) {
          return Promise.resolve({ data: sampleTags });
        } else {
          return Promise.resolve({
            data: {
              results: [sampleGalleryImage, sampleGalleryVideo],
              pages: 1,
              page: 1,
              page_size: 20,
              count: 2,
            },
          });
        }
      }
    );
    vi.spyOn(ViewsAPI, "useViews").mockReturnValue({
      activeView: "GRID",
      switchToGrid: vi.fn(),
      switchToList: vi.fn(),
    });
    vi.spyOn(UserEntity, "useUser").mockReturnValue({
      user: UserEntity.sampleUser,
      isAuthenticated: true,
    });
  });

  it("should render media details with all the data", () => {
    vi.spyOn(Router, "useParams").mockReturnValue({ "*": "sample-image-key" });
    const { getByText } = renderWithProviders(<GalleryLayout />);

    expect(getByText("갤러리")).toBeInTheDocument();
  });

  it("should render correctly with search params (List View)", async () => {
    const setSearchParams = vi.fn();
    vi.spyOn(Router, "useSearchParams").mockReturnValue([
      new URLSearchParams("album=기본 앨범&tag=시즌&tag=야구&page=2"),
      setSearchParams,
    ]);
    vi.spyOn(ViewsAPI, "useViews").mockReturnValue({
      activeView: "LIST",
      switchToGrid: vi.fn(),
      switchToList: vi.fn(),
    });
    const { getByTestId, queryByText } = renderWithProviders(<GalleryLayout />);

    await waitFor(() => {
      expect(queryByText("전체 앨범")).not.toBeInTheDocument(); // 선택된 앨범이 있을때는 "전체 앨범"이 없다
    });

    // 이미 선택된 앨범을 다시 클릭해서 해제
    fireEvent.click(getByTestId("album-기본 앨범-card"));

    await waitFor(() => {
      expect(setSearchParams).toHaveBeenCalled();
      const callbackFn = setSearchParams.mock.calls.at(-1)![0] as (
        prev: URLSearchParams
      ) => URLSearchParams;
      const nextParams = callbackFn(
        new URLSearchParams({ album: "기본 앨범", tag: "시즌" })
      );
      expect(nextParams.get("album")).toBeNull();
      expect(nextParams.getAll("tag")).toContain("시즌");
    });

    // 이미 선택된 태그를 다시 클릭해서 해제
    fireEvent.click(getByTestId("tag-시즌-badge"));

    await waitFor(() => {
      expect(setSearchParams).toHaveBeenCalled();
      const callbackFn = setSearchParams.mock.calls.at(-1)![0] as (
        prev: URLSearchParams
      ) => URLSearchParams;
      const nextParams = callbackFn(
        new URLSearchParams({ album: "기본 앨범", tag: "시즌" })
      );
      expect(nextParams.get("album")).toBe("기본 앨범");
      expect(nextParams.getAll("tag")).not.toContain("시즌");
    });
  });

  it("should render correctly with invalid search params", async () => {
    const setSearchParamsMock = vi.fn();
    vi.spyOn(Router, "useSearchParams").mockReturnValue([
      new URLSearchParams({ album: "invalid", tag: "invalid", page: "0" }),
      setSearchParamsMock,
    ]);
    const { getByTestId } = renderWithProviders(<GalleryLayout />);

    await waitFor(() => {
      expect(getByTestId("album-기본 앨범-card")).toBeInTheDocument();
    });

    // 앨범 클릭 (선택) 테스트
    fireEvent.click(getByTestId("album-기본 앨범-card"));

    await waitFor(() => {
      expect(setSearchParamsMock).toHaveBeenCalled();
      const callbackFn = setSearchParamsMock.mock.calls.at(-1)![0] as (
        prev: URLSearchParams
      ) => URLSearchParams;
      const nextParams = callbackFn(new URLSearchParams());
      expect(nextParams.get("album")).toBe("기본 앨범");
    });

    // 태그 클릭 (선택) 테스트
    fireEvent.click(getByTestId("tag-시즌-badge"));

    await waitFor(() => {
      expect(setSearchParamsMock).toHaveBeenCalled();
      const callbackFn = setSearchParamsMock.mock.calls.at(-1)![0] as (
        prev: URLSearchParams
      ) => URLSearchParams;
      const nextParams = callbackFn(new URLSearchParams());
      expect(nextParams.getAll("tag")).toContain("시즌");
    });
  });

  it("should handle API errors", async () => {
    vi.spyOn(AxiosAPI.axiosInstanceWithAuth, "get").mockRejectedValue(
      new Error("API Error")
    );

    const { getByText } = renderWithProviders(<GalleryLayout />);

    await waitFor(() => {
      expect(
        getByText("갤러리 정보를 불러오는 데 실패했습니다")
      ).toBeInTheDocument();
    });

    fireEvent.click(getByText("다시 시도"));

    await waitFor(() => {
      expect(
        getByText("갤러리 정보를 불러오는 데 실패했습니다")
      ).toBeInTheDocument();
    });
  });

  it("should handle empty media (as admin)", async () => {
    vi.spyOn(AxiosAPI.axiosInstanceWithAuth, "get").mockImplementation(
      (url) => {
        if (url.includes("albums/")) {
          return Promise.resolve({ data: sampleAlbums });
        } else if (url.includes("tags/")) {
          return Promise.resolve({ data: sampleTags });
        } else {
          return Promise.resolve({
            data: {
              results: [],
              pages: 0,
              page: 0,
              page_size: 20,
              count: 0,
            },
          });
        }
      }
    );
    vi.spyOn(UserEntity, "useUser").mockReturnValue({
      user: UserEntity.sampleAdmin,
      isAuthenticated: true,
    });

    const { getByText } = renderWithProviders(<GalleryLayout />);

    await waitFor(() => {
      expect(getByText("아직 업로드된 파일이 없습니다.")).toBeInTheDocument();
    });

    fireEvent.click(getByText("업로드하기"));
  });
});
