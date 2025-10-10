import { beforeEach, describe, expect, it, vi } from "vitest";
import { fireEvent, waitFor } from "@testing-library/react";

import {
  UploadMediaFormProvider,
  SelectMediaMeta,
  useUploadMediaForm,
} from "@features/gallery/media/upload";
import * as AlbumEntity from "@entities/gallery/album";
import * as TagEntity from "@entities/gallery/tags";
import * as AxiosAPI from "@shared/lib/axios";
import * as FilesAPI from "@shared/lib/files";
import * as StorageAPI from "@shared/lib/storage";
import { renderWithProviders } from "@test-utils/renderer";

const setErrorMock = vi.fn();
const setDoneMock = vi.fn();
const setProgressMock = vi.fn();
const clearMock = vi.fn();

const InnerComponent = () => {
  const { submit } = useUploadMediaForm();

  return (
    <button onClick={submit} data-testid="submit">
      Submit
    </button>
  );
};

const postUploadMock = vi.fn();
const TestComponent = ({
  album,
  tags,
}: {
  album: AlbumEntity.AlbumType | null;
  tags: TagEntity.MediaTagType[];
}) => {
  return (
    <UploadMediaFormProvider
      initialAlbum={album}
      initialTags={tags}
      postUpload={postUploadMock}
    >
      <SelectMediaMeta />
      <InnerComponent />
    </UploadMediaFormProvider>
  );
};

describe("UploadMedia", () => {
    /* 성공 사례는 pages에서 테스트 */

  beforeEach(() => {
    vi.spyOn(AlbumEntity, "useAlbums").mockReturnValue({
      albums: AlbumEntity.sampleAlbums,
      selectedAlbum: AlbumEntity.sampleAlbums[0],
      refresh: vi.fn(),
      isLoading: false,
      isError: false,
    });
    vi.spyOn(TagEntity, "useTags").mockReturnValue({
      tags: TagEntity.sampleTags,
      selectedTags: TagEntity.sampleTags,
      refresh: vi.fn(),
      isLoading: false,
      isError: false,
    });
    vi.spyOn(FilesAPI, "useFileSelect").mockReturnValue({
      fileObjs: [FilesAPI.sampleUploadItem],
      addFiles: vi.fn(),
      removeFile: vi.fn(),
      setError: setErrorMock,
      setDone: setDoneMock,
      setProgress: setProgressMock,
      clear: clearMock,
      overallProgress: 0,
    });
    vi.spyOn(StorageAPI, "uploadToS3").mockResolvedValue();
  });

  it("handles album and tag select correctly", () => {
    const { getByTestId, getByText } = renderWithProviders(
      <TestComponent album={null} tags={[]} />
    );
    expect(getByText("앨범 선택")).toBeInTheDocument();
    expect(getByText("태그 선택")).toBeInTheDocument();

    // 앨범 선택
    fireEvent.click(getByTestId("open-album-select"));
    fireEvent.click(getByTestId("select-기본 앨범"));

    // 태그 선택
    fireEvent.click(getByTestId("open-tag-select"));
    fireEvent.click(getByTestId("select-야구"));
  });

  it("handles album and tag unselect correctly", () => {
    const { getByTestId, getByText } = renderWithProviders(
      <TestComponent
        album={AlbumEntity.sampleAlbums[0]}
        tags={[TagEntity.sampleTags[0]]}
      />
    );
    expect(getByText("앨범 선택")).toBeInTheDocument();
    expect(getByText("태그 선택")).toBeInTheDocument();

    // 앨범 선택
    fireEvent.click(getByTestId("open-album-dropdown"));
    fireEvent.click(getByTestId("remove-selected"));

    // 태그 선택
    fireEvent.click(getByTestId("open-tags-dropdown"));
    fireEvent.click(getByTestId("deselect-1"));
  });

  it("handles submit fail correctly (presign fail)", async () => {
    const { getByTestId } = renderWithProviders(
      <TestComponent
        album={AlbumEntity.sampleAlbums[0]}
        tags={[TagEntity.sampleTags[0]]}
      />
    );

    fireEvent.click(getByTestId("submit"));

    vi.spyOn(AxiosAPI.axiosInstanceWithAuth, "post").mockRejectedValueOnce(
      new Error("Presign/업로드 실패")
    );
    await waitFor(() => {
      expect(setErrorMock).toHaveBeenCalledWith(
        FilesAPI.sampleUploadItem.id,
        "Presign/업로드 실패"
      );
    });
  });

  it("handles submit fail correctly (complete fail)", async () => {
    const { getByTestId } = renderWithProviders(
      <TestComponent
        album={AlbumEntity.sampleAlbums[0]}
        tags={[TagEntity.sampleTags[0]]}
      />
    );

    vi.spyOn(AxiosAPI.axiosInstanceWithAuth, "post").mockImplementation((url) => {
      if (url.endsWith("/complete/")) {
        return Promise.reject(new Error("서버 완료 처리 실패"));
      }
      return Promise.resolve({
        data: {
          url: "sample-presigned-url",
          fields: { key: "sample-key" },
        },
      });
    });

    fireEvent.click(getByTestId("submit"));

    await waitFor(() => {
      expect(setErrorMock).toHaveBeenCalledWith(
        FilesAPI.sampleUploadItem.id,
        "서버 완료 처리 실패"
      );
    });
  });

  it("does not submit when album is null", () => {
    const { getByTestId } = renderWithProviders(
      <TestComponent album={null} tags={[TagEntity.sampleTags[0]]} />
    );

    fireEvent.click(getByTestId("submit"));

    expect(postUploadMock).not.toHaveBeenCalled();
  });
});
