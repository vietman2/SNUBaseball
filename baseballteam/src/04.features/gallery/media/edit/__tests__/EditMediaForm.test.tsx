import { beforeEach, describe, expect, it, vi } from "vitest";
import { fireEvent, waitFor } from "@testing-library/react";

import { EditMediaForm } from "@features/gallery/media/edit";
import * as AlbumEntity from "@entities/gallery/album";
import * as MediaEntity from "@entities/gallery/media";
import * as TagEntity from "@entities/gallery/tags";
import * as AxiosAPI from "@shared/lib/axios";
import { renderWithProviders } from "@test-utils/renderer";

describe("EditMediaForm", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.spyOn(MediaEntity, "useMedia").mockReturnValue({
      media: [MediaEntity.sampleGalleryImage],
      selectedMedia: MediaEntity.sampleGalleryImage,
      num_pages: 1,
      current_page: 1,
      page_size: 20,
      refresh: vi.fn(),
      isLoading: false,
      isError: false,
    });
    vi.spyOn(AlbumEntity, "useAlbums").mockReturnValue({
      albums: AlbumEntity.sampleAlbums,
      selectedAlbum: null,
      isLoading: false,
      isError: false,
      refresh: vi.fn(),
    });
    vi.spyOn(TagEntity, "useTags").mockReturnValue({
      tags: TagEntity.sampleTags,
      selectedTags: [],
      isLoading: false,
      isError: false,
      refresh: vi.fn(),
    });
  });

  it("successfully edits media (video)", async () => {
    const closeMediaMock = vi.fn();
    const { getByTestId } = renderWithProviders(
      <EditMediaForm
        media={MediaEntity.sampleGalleryVideo}
        closeMedia={closeMediaMock}
      />
    );

    await waitFor(() => {
      expect(getByTestId("edit-media-form")).toBeInTheDocument();
    });

    // Change album
    fireEvent.click(getByTestId("open-album-dropdown"));
    fireEvent.click(getByTestId("select-부원 전용 앨범"));

    // Change tags
    fireEvent.click(getByTestId("open-tags-dropdown"));
    fireEvent.click(getByTestId("select-야구"));
    fireEvent.click(getByTestId("select-단체사진"));
    fireEvent.click(getByTestId("select-야구"));

    // Submit
    vi.spyOn(AxiosAPI.axiosInstanceWithAuth, "patch").mockResolvedValue({
      data: {
        ...MediaEntity.sampleGalleryImage,
        album: AlbumEntity.sampleAlbums[1],
        tags: [TagEntity.sampleTags[1], TagEntity.sampleTags[2]],
      },
    });
    const submitButton = getByTestId("submit-edit");
    expect(submitButton).not.toBeDisabled();
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(closeMediaMock).toHaveBeenCalledTimes(1);
    });
  });

  it("handles no album selected (cannot find initial album)", async () => {
    const closeMediaMock = vi.fn();
    const { getByTestId } = renderWithProviders(
      <EditMediaForm
        media={{
          ...MediaEntity.sampleGalleryImage,
          album: {
            ...MediaEntity.sampleGalleryImage.album,
            id: 999,
            title: "없는 앨범",
          },
        }}
        closeMedia={closeMediaMock}
      />
    );

    await waitFor(() => {
      expect(getByTestId("edit-media-form")).toBeInTheDocument();
    });

    // Submit
    const submitButton = getByTestId("submit-edit");
    expect(submitButton).toBeDisabled();
    fireEvent.click(submitButton);
    expect(closeMediaMock).toHaveBeenCalledTimes(0);
  });

  it("handles API failure", async () => {
    const closeMediaMock = vi.fn();
    const { getByTestId } = renderWithProviders(
      <EditMediaForm
        media={MediaEntity.sampleGalleryImage}
        closeMedia={closeMediaMock}
      />
    );

    await waitFor(() => {
      expect(getByTestId("edit-media-form")).toBeInTheDocument();
    });

    // Deselect album
    fireEvent.click(getByTestId("open-album-dropdown"));
    fireEvent.click(getByTestId("remove-selected"));

    // Reselect album
    fireEvent.click(getByTestId("open-album-dropdown"));
    fireEvent.click(getByTestId("select-부원 전용 앨범"));

    // Submit
    vi.spyOn(window, "alert").mockImplementation(() => {});
    vi.spyOn(AxiosAPI.axiosInstanceWithAuth, "patch").mockRejectedValue({});
    const submitButton = getByTestId("submit-edit");
    expect(submitButton).not.toBeDisabled();
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(window.alert).toHaveBeenCalledTimes(1);
      expect(closeMediaMock).toHaveBeenCalledTimes(0);
    });
  });

  it("handles tags change only", async () => {
    const closeMediaMock = vi.fn();
    const { getByTestId } = renderWithProviders(
      <EditMediaForm
        media={MediaEntity.sampleGalleryImage}
        closeMedia={closeMediaMock}
      />
    );

    await waitFor(() => {
      expect(getByTestId("edit-media-form")).toBeInTheDocument();
    });

    // Change tags
    fireEvent.click(getByTestId("open-tags-dropdown"));
    fireEvent.click(getByTestId("select-야구")); // 야구를 선택 비활성화하고
    fireEvent.click(getByTestId("select-단체사진")); // 단체사진을 선택 활성화해서, 태그 set 비교 corner case를 테스트
  });
});
