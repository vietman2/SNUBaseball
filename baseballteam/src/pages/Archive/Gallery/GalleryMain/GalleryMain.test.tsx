import { fireEvent, screen, waitFor } from "@testing-library/react";

import { GalleryMain } from "./GalleryMain";
import {
  AlbumProvider,
  MediaProvider,
  MemberProvider,
  TagProvider,
} from "../_contexts";
import * as GalleryContexts from "../_contexts";
import * as AuthContext from "@contexts/auth";
import { sampleAlbums, sampleMedia, sampleTags } from "@data/archive";
import {
  sampleAdmin,
  sampleAuthorProfile,
  sampleMemberMinis,
} from "@data/user";
import { useIntersectionObserver } from "@hooks/useIntersectionObserver";
import { renderWithProviders } from "@utils/test-utils";

jest.mock("../_components", () => ({
  AlbumPreview: () => <div data-testid="album-preview" />,
  MediaPreview: () => <div data-testid="media-preview" />,
}));
jest.mock("../_contexts", () => ({
  AlbumProvider: ({ children }: { children: React.ReactNode }) => children,
  MediaProvider: ({ children }: { children: React.ReactNode }) => children,
  MemberProvider: ({ children }: { children: React.ReactNode }) => children,
  TagProvider: ({ children }: { children: React.ReactNode }) => children,
  useAlbum: jest.fn(),
  useMedia: jest.fn(),
  useMember: jest.fn(),
  useTag: jest.fn(),
}));
jest.mock("../_modals", () => ({
  CreateAlbumModal: () => <div data-testid="create-album-modal" />,
  UploadModal: () => <div data-testid="upload-modal" />,
}));
jest.mock("@hooks/useIntersectionObserver");

const mockUseIntersectionObserver = useIntersectionObserver as jest.Mock;

const render = () => {
  return renderWithProviders(
    <AlbumProvider>
      <MediaProvider>
        <MemberProvider>
          <TagProvider>
            <GalleryMain />
          </TagProvider>
        </MemberProvider>
      </MediaProvider>
    </AlbumProvider>
  );
};

describe("<GalleryMain />", () => {
  const defaultMediaContext = {
    files: sampleMedia,
    selectedImage: null,
    selectedVideo: null,
    loading: false,
    reloadData: jest.fn(),
    loadMoreData: jest.fn(),
    selectMedia: jest.fn(),
    deleteMedia: jest.fn(),
    updateAlbum: jest.fn(),
    updatePerson: jest.fn(),
    updateTags: jest.fn(),
  };
  let intersectionCallback: IntersectionObserverCallback;

  beforeEach(() => {
    jest.spyOn(window, "scrollTo").mockImplementation(() => {});
    jest.spyOn(AuthContext, "useAuth").mockReturnValue({
      user: sampleAdmin,
      login: jest.fn(),
      logout: jest.fn(),
    });
    jest.spyOn(GalleryContexts, "useAlbum").mockReturnValue({
      albums: sampleAlbums,
      selectedAlbum: null,
      selectAlbum: jest.fn(),
      createNewAlbum: jest.fn(),
    });
    jest.spyOn(GalleryContexts, "useMember").mockReturnValue({
      people: sampleMemberMinis,
      selectedPerson: null,
      selectPerson: jest.fn(),
    });
    jest
      .spyOn(GalleryContexts, "useMedia")
      .mockReturnValue(defaultMediaContext);
    jest.spyOn(GalleryContexts, "useTag").mockReturnValue({
      allTags: sampleTags,
      selectedTag: null,
      selectTag: jest.fn(),
    });
    mockUseIntersectionObserver.mockImplementation((callback) => {
      intersectionCallback = callback;
      return { current: null };
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("handles all actions in admin mode", async () => {
    render();

    await waitFor(() => {
      fireEvent.click(screen.getByTestId("album-list")); // Navigate to albums
      fireEvent.click(screen.getByTestId("album-1")); // Select album
      fireEvent.click(screen.getByTestId("back")); // Unselect album
      fireEvent.click(screen.getByTestId("add-album")); // Open create album modal
    });

    waitFor(() => {
      intersectionCallback(
        [{ isIntersecting: true }] as IntersectionObserverEntry[],
        {} as IntersectionObserver
      );
    }); // Load more data
  });

  it("handles all actions in normal mode", async () => {
    jest.spyOn(AuthContext, "useAuth").mockReturnValue({
      user: sampleAuthorProfile,
      login: jest.fn(),
      logout: jest.fn(),
    });
    jest.spyOn(GalleryContexts, "useAlbum").mockReturnValue({
      albums: sampleAlbums,
      selectedAlbum: sampleAlbums[0],
      selectAlbum: jest.fn(),
      createNewAlbum: jest.fn(),
    });
    jest.spyOn(GalleryContexts, "useMedia").mockReturnValue({
      ...defaultMediaContext,
      loading: true,
    });
    render();

    await waitFor(() => {
      fireEvent.click(screen.getByTestId("album-list")); // Do nothing
      fireEvent.click(screen.getByTestId("album-1")); // Do nothing (loading)
      fireEvent.click(screen.getByTestId("upload")); // Open upload modal
      fireEvent.click(screen.getByTestId("filter")); // Open filter modal
      fireEvent.click(screen.getByTestId("media-1")); // Select media
    });
  });
});
