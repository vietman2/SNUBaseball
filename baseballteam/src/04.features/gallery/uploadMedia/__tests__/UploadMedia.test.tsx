import { describe, expect, it, vi } from "vitest";
import { fireEvent, waitFor } from "@testing-library/react";

import * as CompleteAPI from "../api/complete";
import * as SingleMediaAPI from "../api/uploadSingleMedia";
import {
  UploadMediaForm,
  UploadMediaFormProvider,
} from "@features/gallery/uploadMedia";
import {
  GalleryProvider,
  MediaSelectsProvider,
  sampleAlbums,
  type AlbumType,
  type MediaTagType,
} from "@entities/gallery";
import { renderWithProviders } from "@test-utils/renderer";

vi.unmock("@shared/lib/files");
vi.mock("@entities/gallery", async () => {
  const actual = await vi.importActual("@entities/gallery");

  return {
    ...actual,
    useGallery: vi.fn().mockReturnValue({
      albums: actual.sampleAlbums,
      tags: actual.sampleTags,
      isLoading: false,
      isError: false,
      refresh: vi.fn(),
    }),
  };
});
vi.mock("@shared/lib/storage", async () => {
  const actual = await vi.importActual("@shared/lib/storage");
  return {
    ...actual,
    uploadToS3: vi.fn().mockImplementation(({ onProgress }) => {
      onProgress(25);
      onProgress(50);
      onProgress(75);
      onProgress(100);
      return Promise.resolve({});
    }),
  };
});
vi.mock("@shared/ui/Selects", async () => {
  const actualGallery = await vi.importActual("@entities/gallery");
  return {
    SingleSelectMenu: ({
      onSelect,
      getLabel,
    }: {
      onSelect: (album: AlbumType) => void;
      getLabel: (album: AlbumType) => string;
    }) => {
      const gallery = actualGallery as { sampleAlbums: AlbumType[] };
      return (
        <div>
          <button onClick={() => onSelect(gallery.sampleAlbums[1])}>
            앨범 선택 변경
          </button>
          <span>{getLabel(gallery.sampleAlbums[1])}</span>
        </div>
      );
    },
    MultiSelectMenu: ({
      onSelect,
      getLabel,
    }: {
      onSelect: (tag: MediaTagType) => void;
      getLabel: (tag: MediaTagType) => string;
    }) => {
      const gallery = actualGallery as { sampleTags: MediaTagType[] };
      return (
        <div>
          <button onClick={() => onSelect(gallery.sampleTags[0])}>
            태그 선택 변경
          </button>
          <span>{getLabel(gallery.sampleTags[0])}</span>
        </div>
      );
    },
  };
});

const postUpload = vi.fn();

const TestComponent = () => {
  return (
    <GalleryProvider>
      <MediaSelectsProvider initialAlbum={sampleAlbums[0]}>
        <UploadMediaFormProvider postUpload={postUpload}>
          <UploadMediaForm />
        </UploadMediaFormProvider>
      </MediaSelectsProvider>
    </GalleryProvider>
  );
};

describe("UploadMedia", () => {
  it("handles 1 successful upload and 2 failed uploads", async () => {
    vi.spyOn(SingleMediaAPI, "uploadSingleMedia").mockImplementation(
      (_: number, file: File, onProgress: (percent: number) => void) => {
        if (file.name === "fail.png") {
          return Promise.resolve(null);
        }
        if (file.name === "error.png") {
          return Promise.reject(new Error("Upload error"));
        }
        onProgress(25);
        onProgress(50);
        onProgress(75);
        onProgress(100);
        return Promise.resolve({
          status: "SUCCESS",
          data: { key: "uploaded-file-key", original_filename: file.name },
        });
      }
    );
    vi.spyOn(CompleteAPI, "completeUpload").mockResolvedValue(true);
    const { getByTestId, getByText } = renderWithProviders(<TestComponent />);

    // 가장 먼저, 앨범 선택 변경
    fireEvent.click(getByText("앨범 선택 변경"));
    // 태그 선택 변경 / 선택 해제 / 다시 선택
    fireEvent.click(getByText("태그 선택 변경"));
    fireEvent.click(getByText("태그 선택 변경"));
    fireEvent.click(getByText("태그 선택 변경"));

    // 파일 선택
    const files = [
      new File(["hello"], "hello.png", { type: "image/png" }),
      new File(["presign-fail"], "fail.png", { type: "image/png" }),
      new File(["error"], "error.png", { type: "image/png" }),
    ];
    fireEvent.change(getByTestId("file-input"), { target: { files } });

    await waitFor(() => {
      expect(getByTestId("file-item-hello.png")).toBeInTheDocument();
    });

    // 업로드 시작
    fireEvent.click(getByText("업로드"));

    await waitFor(() => {
      expect(getByText("업로드에 실패했습니다.")).toBeInTheDocument();
    });
  });
  
  it("handles drag and drop and submit without album", async () => {
    const { getByTestId } = renderWithProviders(<TestComponent />);

    const dragArea = getByTestId("drag-area");

    const file = new File(["dragged content"], "dragged.png", {
      type: "image/png",
    });

    // drag over
    fireEvent.dragOver(dragArea);

    // drop
    fireEvent.drop(dragArea, {
      dataTransfer: {
        files: [file],
        items: [],
        types: [],
      },
    });

    expect(getByTestId("file-item-dragged.png")).toBeInTheDocument();

    // drag leave
    fireEvent.dragLeave(dragArea);
  });

  it("handles upload large file (by clicking the area)", async () => {
    const { getByTestId } = renderWithProviders(<TestComponent />);

    const file = new File(["a".repeat(10 * 1024 * 1024)], "largefile.png", {
      type: "image/png",
    });

    fireEvent.click(getByTestId("file-select-button"));
    fireEvent.change(getByTestId("file-input"), { target: { files: [file] } });

    await waitFor(() => {
      expect(getByTestId("file-item-largefile.png")).toBeInTheDocument();
    });
    fireEvent.click(getByTestId("remove-file"));
  });

  it("handles too many files", async () => {
    vi.spyOn(window, "alert").mockImplementation(() => {});
    const { getByTestId } = renderWithProviders(<TestComponent />);

    const files = Array.from({ length: 25 }, (_, i) => {
      return new File([`file${i}`], `file${i}.png`, { type: "image/png" });
    });

    fireEvent.change(getByTestId("file-input"), { target: { files } });

    const moreFiles = Array.from({ length: 6 }, (_, i) => {
      return new File([`morefile${i}`], `morefile${i}.png`, {
        type: "image/png",
      });
    });
    fireEvent.change(getByTestId("file-input"), {
      target: { files: moreFiles },
    });

    await waitFor(() => {
      expect(window.alert).toHaveBeenCalledWith(
        "최대 30개까지 업로드할 수 있습니다."
      );
    });

    const tooManyFiles = Array.from({ length: 35 }, (_, i) => {
      return new File([`file${i}`], `file${i}.png`, { type: "image/png" });
    });
    fireEvent.change(getByTestId("file-input"), {
      target: { files: tooManyFiles },
    });

    await waitFor(() => {
      expect(window.alert).toHaveBeenCalledWith(
        "최대 30개까지 업로드할 수 있습니다."
      );
    });
  });

  it("handles complete upload failure", async () => {
    vi.spyOn(SingleMediaAPI, "uploadSingleMedia").mockResolvedValue({
      status: "SUCCESS",
      data: { key: "uploaded-file-key", original_filename: "file.png" },
    });
    vi.spyOn(CompleteAPI, "completeUpload").mockResolvedValue(false);
    const { getByTestId, getByText } = renderWithProviders(<TestComponent />);

    const file = new File(["file content"], "file.png", { type: "image/png" });
    fireEvent.change(getByTestId("file-input"), { target: { files: [file] } });

    await waitFor(() => {
      expect(getByTestId("file-item-file.png")).toBeInTheDocument();
    });

    fireEvent.click(getByText("업로드"));

    await waitFor(() => {
      expect(getByText("서버 완료 처리 실패")).toBeInTheDocument();
    });
  });

  it("handles 100% successful upload", async () => {
    vi.spyOn(SingleMediaAPI, "uploadSingleMedia").mockResolvedValue({
      status: "SUCCESS",
      data: { key: "uploaded-file-key", original_filename: "file.png" },
    });
    vi.spyOn(CompleteAPI, "completeUpload").mockResolvedValue(true);
    const { getByTestId, getByText } = renderWithProviders(<TestComponent />);

    const file = new File(["file content"], "file.png", { type: "image/png" });
    fireEvent.change(getByTestId("file-input"), { target: { files: [file] } });

    await waitFor(() => {
      expect(getByTestId("file-item-file.png")).toBeInTheDocument();
    });

    // 100% duplicate 체크
    fireEvent.change(getByTestId("file-input"), { target: { files: [file] } });

    fireEvent.click(getByText("업로드"));

    await waitFor(() => {
      expect(postUpload).toHaveBeenCalled();
    });
  });

  it("handles 100% presign fail", async () => {
    vi.spyOn(SingleMediaAPI, "uploadSingleMedia").mockResolvedValue(null);
    vi.spyOn(CompleteAPI, "completeUpload").mockResolvedValue(true);
    const { getByTestId, getByText } = renderWithProviders(<TestComponent />);

    const file = new File(["file content"], "file.png", { type: "image/png" });
    fireEvent.change(getByTestId("file-input"), { target: { files: [file] } });

    await waitFor(() => {
      expect(getByTestId("file-item-file.png")).toBeInTheDocument();
    });

    fireEvent.click(getByText("업로드"));

    await waitFor(() => {
      expect(getByText("Presign/업로드 실패")).toBeInTheDocument();
    });
  });

  it("handles add 0 files and duplicate files", async () => {
    const { getByTestId } = renderWithProviders(<TestComponent />);

    fireEvent.change(getByTestId("file-input"), {
      target: { files: null },
    });

    const file1 = new File(["duplicate"], "duplicate.png", {
      type: "image/png",
    });
    const file2 = new File(["duplicate"], "duplicate.png", {
      type: "image/png",
    });
    const file3 = new File(["unique"], "unique.png", {
      type: "image/png",
    });

    fireEvent.change(getByTestId("file-input"), {
      target: { files: [file1, file2, file3] },
    });

    await waitFor(() => {
      expect(getByTestId("file-item-duplicate.png")).toBeInTheDocument();
      expect(getByTestId("file-item-unique.png")).toBeInTheDocument();
    });
  });
});
