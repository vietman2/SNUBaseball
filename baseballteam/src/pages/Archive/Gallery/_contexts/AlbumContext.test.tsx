import { fireEvent, screen, waitFor } from "@testing-library/react";

import { AlbumProvider, useAlbum } from "./AlbumContext";
import { sampleAlbums } from "@data/archive";
import * as AlbumsAPI from "@services/archive/archive";
import { renderWithProviders } from "@utils/test-utils";

const TestComponent = () => {
  const {
    albums,
    selectedAlbum,
    selectAlbum,
    createNewAlbum,
    editAlbum,
    deleteAlbum,
  } = useAlbum();

  return (
    <div>
      <span>{`Albums: ${albums.length}`}</span>
      <span>{`Selected album: ${selectedAlbum?.title}`}</span>
      <button onClick={() => selectAlbum(albums[0])}>Select Album</button>
      <button onClick={() => createNewAlbum("New Album", false)}>
        Create New Album
      </button>
      <button onClick={() => editAlbum(0, "Edited Album", true)}>
        Edit Album
      </button>
      <button onClick={() => deleteAlbum(0)}>Delete Album</button>
    </div>
  );
};

describe("<AlbumProvider />", () => {
  beforeEach(() => {
    jest.spyOn(AlbumsAPI, "getAlbums").mockResolvedValue(sampleAlbums);
    jest.spyOn(AlbumsAPI, "createAlbum").mockResolvedValue(true);
    jest.spyOn(AlbumsAPI, "updateAlbum").mockResolvedValue(true);
    jest.spyOn(AlbumsAPI, "removeAlbum").mockResolvedValue(true);
  });

  it("should handle initial data loading and other function calls", async () => {
    renderWithProviders(
      <AlbumProvider>
        <TestComponent />
      </AlbumProvider>
    );

    await waitFor(() => {
      fireEvent.click(screen.getByText("Create New Album"));
      fireEvent.click(screen.getByText("Select Album"));
      fireEvent.click(screen.getByText("Edit Album"));
      fireEvent.click(screen.getByText("Delete Album"));
    });
  });

  it("should handle api error", async () => {
    jest.spyOn(AlbumsAPI, "getAlbums").mockResolvedValue(null);
    jest.spyOn(AlbumsAPI, "createAlbum").mockResolvedValue(null);
    jest.spyOn(AlbumsAPI, "updateAlbum").mockResolvedValue(null);
    jest.spyOn(AlbumsAPI, "removeAlbum").mockResolvedValue(null);
    renderWithProviders(
      <AlbumProvider>
        <TestComponent />
      </AlbumProvider>
    );

    await waitFor(() => {
      fireEvent.click(screen.getByText("Create New Album"));
      fireEvent.click(screen.getByText("Edit Album"));
      fireEvent.click(screen.getByText("Delete Album"));
    });
  });

  it("should handle misuse", async () => {
    jest.spyOn(console, "error").mockImplementation(() => {});
    expect(() => renderWithProviders(<TestComponent />)).toThrow();
  });
});
