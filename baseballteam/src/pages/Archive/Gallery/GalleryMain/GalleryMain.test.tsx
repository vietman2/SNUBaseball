/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { fireEvent, screen, waitFor } from "@testing-library/react";
import axios from "axios";

import { GalleryMain } from "./GalleryMain";
import * as AuthContext from "@contexts/auth";
import { GalleryProvider } from "@contexts/gallery";
import * as GalleryContext from "@contexts/gallery";
import {
  sampleAlbums,
  sampleMedia,
  sampleMediaResponse,
  sampleTags,
} from "@data/archive";
import { sampleAdmin, sampleAuthorProfile } from "@data/user";
import * as FilesAPI from "@services/archive/files";
import { renderWithProviders } from "@utils/test-utils";

jest.mock("@contexts/gallery", () => ({
  GalleryProvider: ({ children }: { children: React.ReactNode }) => children,
  useGallery: jest.fn(),
}));
jest.mock("@fragments/Gallery", () => ({
  AlbumPreview: () => <div>AlbumPreview</div>,
  FilterModal: () => <div>FilterModal</div>,
  MediaSimple: () => <div>MediaSimple</div>,
  UploadModal: () => <div>UploadModal</div>,
}));

describe("<GalleryMain />", () => {
  const defaultContext = {
    albums: sampleAlbums,
    people: [],
    allTags: sampleTags,
    memberQuery: "",
    updateCount: 0,
    setMemberQuery: jest.fn(),
    update: jest.fn(),
  };

  beforeAll(() => {
    class MockIntersectionObserver implements IntersectionObserver {
      callback: IntersectionObserverCallback;
      root: Element | null = null;
      rootMargin: string = "";
      thresholds: ReadonlyArray<number> = [];

      constructor(
        callback: IntersectionObserverCallback,
        options?: IntersectionObserverInit
      ) {
        this.callback = callback;
      }

      observe(target: Element): void {
        // Immediately trigger the callback as if the element is in view.
        this.callback(
          [{ isIntersecting: true, target } as IntersectionObserverEntry],
          this
        );
      }

      unobserve(target: Element): void {
        // No operation needed.
      }

      disconnect(): void {
        // No operation needed.
      }

      takeRecords(): IntersectionObserverEntry[] {
        return [];
      }
    }

    // Override the global IntersectionObserver.
    global.IntersectionObserver = MockIntersectionObserver as any;
  });

  beforeEach(() => {
    jest.clearAllMocks();
    jest.spyOn(window, "scrollTo").mockImplementation(() => {});
    jest.spyOn(AuthContext, "useAuth").mockReturnValue({
      user: sampleAdmin,
      login: jest.fn(),
      logout: jest.fn(),
    });
    jest.spyOn(GalleryContext, "useGallery").mockReturnValue(defaultContext);
    jest.spyOn(FilesAPI, "getFiles").mockResolvedValue({
      ...sampleMediaResponse,
      results: sampleMedia,
    });
    jest.spyOn(axios, "get").mockResolvedValue({
      data: { ...sampleMediaResponse, results: sampleMedia },
    });
  });

  it("renders and handles navigations", async () => {
    renderWithProviders(
      <GalleryProvider>
        <GalleryMain />
      </GalleryProvider>
    );

    await waitFor(() => {
      fireEvent.click(screen.getByTestId("filter"));
      fireEvent.click(screen.getByTestId("upload"));
      fireEvent.click(screen.getByTestId("album-list"));
      fireEvent.click(screen.getByTestId("album-1"));
      fireEvent.click(screen.getByTestId("back"));
      fireEvent.click(screen.getByTestId("media-1"));
    });
  });

  it("renders as non admin and api failures", async () => {
    jest.spyOn(AuthContext, "useAuth").mockReturnValue({
      user: sampleAuthorProfile,
      login: jest.fn(),
      logout: jest.fn(),
    });
    jest.spyOn(FilesAPI, "getFiles").mockResolvedValueOnce(null);
    jest.spyOn(axios, "get").mockRejectedValueOnce(new Error("Failed to load"));

    renderWithProviders(
      <GalleryProvider>
        <GalleryMain />
      </GalleryProvider>
    );

    await waitFor(() => {
      fireEvent.click(screen.getByTestId("album-list"));
    });
  });

  it("handles observerRef not intersecting", async () => {
    class NotIntersectingObserver implements IntersectionObserver {
      callback: IntersectionObserverCallback;
      root: Element | null = null;
      rootMargin: string = "";
      thresholds: ReadonlyArray<number> = [];
      constructor(
        callback: IntersectionObserverCallback,
        options?: IntersectionObserverInit
      ) {
        this.callback = callback;
      }
      observe(target: Element): void {
        // Simulate an entry that is NOT intersecting.
        this.callback(
          [{ isIntersecting: false, target } as IntersectionObserverEntry],
          this
        );
      }
      unobserve(target: Element): void {}
      disconnect(): void {}
      takeRecords(): IntersectionObserverEntry[] {
        return [];
      }
    }
    // Override global IntersectionObserver with our custom one.
    global.IntersectionObserver = NotIntersectingObserver as any;

    waitFor(() => {
      renderWithProviders(
        <GalleryProvider>
          <GalleryMain />
        </GalleryProvider>
      );
    });
  });
});
