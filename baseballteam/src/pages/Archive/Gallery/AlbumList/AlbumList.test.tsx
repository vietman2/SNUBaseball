import { fireEvent, screen, waitFor } from "@testing-library/react";

import { AlbumList } from "./AlbumList";
import { useAlbumList } from "./_contexts";
import { GalleryProvider } from "@contexts/gallery";
import * as GalleryContext from "@contexts/gallery";
import { sampleAlbums } from "@data/archive";
import * as AlbumsAPI from "@services/archive/albums";
import { renderWithProviders } from "@utils/test-utils";

jest.mock("@contexts/gallery", () => ({
  GalleryProvider: ({ children }: { children: React.ReactNode }) => children,
  useGallery: jest.fn(),
}));

const render = () => {
  renderWithProviders(
    <GalleryProvider>
      <AlbumList />
    </GalleryProvider>
  );
};

describe("<AlbumList />", () => {
  const defaultContext = {
    albums: sampleAlbums,
    people: [],
    allTags: [],
    memberQuery: "",
    setMemberQuery: jest.fn(),
    refresh: jest.fn(),
  };

  beforeEach(() => {
    jest.spyOn(window, "alert").mockImplementation(() => {});
    jest.spyOn(GalleryContext, "useGallery").mockReturnValue(defaultContext);
  });

  it("renders album list and handles create", async () => {
    render();

    fireEvent.click(screen.getByTestId("open-modal")); // Open create modal
    fireEvent.change(screen.getByTestId("album-title-input"), {
      target: { value: "New Album" },
    });
    fireEvent.click(screen.getByTestId("checkbox")); // Toggle checkbox

    jest.spyOn(AlbumsAPI, "createAlbum").mockResolvedValueOnce(null);
    await waitFor(() => {
      fireEvent.click(screen.getByTestId("submit-album")); // Submit
    });

    jest.spyOn(AlbumsAPI, "createAlbum").mockResolvedValueOnce(true);
    await waitFor(() => {
      fireEvent.click(screen.getByTestId("submit-album")); // Submit
    });
  });

  it("handles edit album", async () => {
    render();

    fireEvent.click(screen.getAllByTestId("open-edit-modal")[0]); // Open edit modal

    jest.spyOn(AlbumsAPI, "updateAlbum").mockResolvedValueOnce(null);
    await waitFor(() => {
      fireEvent.click(screen.getByTestId("submit-album")); // Submit
    });

    jest.spyOn(AlbumsAPI, "updateAlbum").mockResolvedValueOnce(true);
    await waitFor(() => {
      fireEvent.click(screen.getByTestId("submit-album")); // Submit
    });
  });

  it("handles delete album and navigate back", async () => {
    render();

    // Cancel delete
    jest.spyOn(window, "confirm").mockReturnValueOnce(false);
    fireEvent.click(screen.getAllByTestId("delete")[0]); // Delete

    // Fail to delete
    jest.spyOn(window, "confirm").mockReturnValue(true);
    jest.spyOn(AlbumsAPI, "removeAlbum").mockResolvedValueOnce(null);
    await waitFor(() => {
      fireEvent.click(screen.getAllByTestId("delete")[0]); // Delete
    });

    // Delete successfully
    jest.spyOn(AlbumsAPI, "removeAlbum").mockResolvedValueOnce(true);
    await waitFor(() => {
      fireEvent.click(screen.getAllByTestId("delete")[0]); // Delete
    });

    fireEvent.click(screen.getByTestId("back")); // Navigate back
  });

  it("handles context misuse", async () => {
    jest.spyOn(console, "error").mockImplementation(() => {});

    const InvalidComponent = () => {
      useAlbumList();
      return <div />;
    };

    expect(() => renderWithProviders(<InvalidComponent />)).toThrow();
  });
});
