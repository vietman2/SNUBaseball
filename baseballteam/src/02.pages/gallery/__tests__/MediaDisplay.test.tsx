import { beforeEach, describe, expect, it, vi } from "vitest";
import { fireEvent, waitFor } from "@testing-library/react";

import { MediaDisplay } from "@pages/gallery/media-display";
import * as AlbumEntity from "@entities/gallery/album";
import * as MediaEntity from "@entities/gallery/media";
import * as TagEntity from "@entities/gallery/tags";
import * as UserEntity from "@entities/user";
import * as AxiosAPI from "@shared/lib/axios";
import { renderWithProviders } from "@test-utils/renderer";

const navigateMock = vi.fn();
vi.mock("react-router", async () => {
  const actual = await vi.importActual("react-router");
  return {
    ...actual,
    useNavigate: () => navigateMock,
  };
});

describe("MediaDisplay", () => {
  beforeEach(() => {
    vi.spyOn(MediaEntity, "useMedia").mockReturnValue({
      media: [MediaEntity.sampleGalleryImage, MediaEntity.sampleGalleryVideo],
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
    vi.spyOn(UserEntity, "useUser").mockReturnValue({
      user: UserEntity.sampleUser,
      isAuthenticated: true,
    });
  });

  it("renders null when no selectedMedia", () => {
    vi.spyOn(MediaEntity, "useMedia").mockReturnValueOnce({
      media: [],
      selectedMedia: null,
      num_pages: 0,
      current_page: 0,
      page_size: 0,
      refresh: vi.fn(),
      isLoading: false,
      isError: false,
    });
    const { container } = renderWithProviders(<MediaDisplay />);

    expect(container).toBeEmptyDOMElement();
  });

  it("does not render edit/delete buttons without permission", () => {
    const { queryByTestId } = renderWithProviders(<MediaDisplay />);

    expect(queryByTestId("delete-button-1")).not.toBeInTheDocument();
  });

  it("renders correctly and handles delete action (user is admin, and media is image)", async () => {
    vi.spyOn(UserEntity, "useUser").mockReturnValue({
      user: UserEntity.sampleAdmin,
      isAuthenticated: true,
    });
    vi.spyOn(window, "confirm").mockReturnValueOnce(true);

    const { getByTestId } = renderWithProviders(<MediaDisplay />);

    await waitFor(() => {
      expect(getByTestId("delete-button-1")).toBeInTheDocument();
    });

    vi.spyOn(AxiosAPI.axiosInstanceWithAuth, "delete").mockResolvedValue({});
    fireEvent.click(getByTestId("delete-button-1"));

    await waitFor(() => {
      expect(navigateMock).toHaveBeenCalledWith("/gallery", { replace: true });
    });
  });

  it("renders edit form when user is uploader (media is video)", async () => {
    vi.spyOn(MediaEntity, "useMedia").mockReturnValue({
      media: [MediaEntity.sampleGalleryImage, MediaEntity.sampleGalleryVideo],
      selectedMedia: MediaEntity.sampleGalleryVideo,
      num_pages: 1,
      current_page: 1,
      page_size: 20,
      refresh: vi.fn(),
      isLoading: false,
      isError: false,
    });
    vi.spyOn(UserEntity, "useUser").mockReturnValue({
      user: { ...UserEntity.sampleUser, uuid: "user1-uuid", role: "MEMBER" },
      isAuthenticated: true,
    });
    const { getByTestId } = renderWithProviders(<MediaDisplay />);

    await waitFor(() => {
      expect(getByTestId("edit-button-1")).toBeInTheDocument();
    });

    fireEvent.click(getByTestId("edit-button-1"));

    await waitFor(() => {
      expect(getByTestId("edit-media-form")).toBeInTheDocument();
    });
  });
});
