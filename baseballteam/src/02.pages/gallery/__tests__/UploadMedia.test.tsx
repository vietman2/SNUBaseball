import { beforeEach, describe, expect, it, vi } from "vitest";
import { fireEvent, waitFor } from "@testing-library/react";

import { UploadMedia } from "@pages/gallery/upload";
import * as AlbumEntity from "@entities/gallery/album";
import * as TagEntity from "@entities/gallery/tags";
import * as AxiosAPI from "@shared/lib/axios";
import * as FilesAPI from "@shared/lib/files";
import * as StorageAPI from "@shared/lib/storage";
import { renderWithProviders } from "@test-utils/renderer";

const mockNavigate = vi.fn();
vi.mock("react-router", async () => {
  const actual = await vi.importActual<typeof import("react-router")>(
    "react-router"
  );
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

describe("UploadMedia", () => {
  const sampleUploadItem: FilesAPI.UploadItem = {
    id: "1",
    file: new File(["dummy content"], "example.png", { type: "image/png" }),
    status: "PENDING",
    progress: 0,
    errorMsg: null,
  };

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
      selectedTags: [TagEntity.sampleTags[0]],
      refresh: vi.fn(),
      isLoading: false,
      isError: false,
    });
    vi.spyOn(FilesAPI, "useFileSelect").mockReturnValue({
      fileObjs: [sampleUploadItem],
      addFiles: vi.fn(),
      removeFile: vi.fn(),
      setError: vi.fn(),
      setDone: vi.fn(),
      setProgress: vi.fn(),
      clear: vi.fn(),
      overallProgress: 0,
    });
  });

  it("handles upload correctly", async () => {
    const { getByText } = renderWithProviders(<UploadMedia />);

    expect(getByText("업로드")).toBeDefined();

    // axios로 presign와 complete를 mock
    vi.spyOn(AxiosAPI.axiosInstanceWithAuth, "post").mockImplementation(
      (url) => {
        if (url.endsWith("/presign/")) {
          return Promise.resolve({
            data: {
              url: "https://s3.mock-url.com/upload",
              fields: {
                key: "mocked-file-key",
              },
            },
          });
        } else {
          return Promise.resolve();
        }
      }
    );
    // 두번째로 s3 업로드를 mock
    vi.spyOn(StorageAPI, "uploadToS3").mockResolvedValue();
    fireEvent.click(getByText("업로드"));

    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith("/gallery", { replace: true });
    });
  });

  it("shows progressbar when uploading", async () => {
    vi.spyOn(FilesAPI, "useFileSelect").mockReturnValue({
      fileObjs: [
        {
          ...sampleUploadItem,
          status: "UPLOADING",
          progress: 30,
        },
      ],
      addFiles: vi.fn(),
      removeFile: vi.fn(),
      setError: vi.fn(),
      setDone: vi.fn(),
      setProgress: vi.fn(),
      clear: vi.fn(),
      overallProgress: 30,
    });

    const { getByText } = renderWithProviders(<UploadMedia />);

    expect(getByText("업로드")).toBeDefined();
    expect(getByText("ProgressBar: 30%")).toBeDefined();
  });
});
