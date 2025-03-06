import { fireEvent, screen, waitFor } from "@testing-library/react";

import { AlbumProvider, useAlbum } from "./AlbumContext";
import { sampleAlbums } from "@data/archive";
import * as AlbumsAPI from "@services/archive/archive";
import { renderWithProviders } from "@utils/test-utils";

const TestComponent = () => {
  const { albums, selectedAlbum, selectAlbum, createNewAlbum } = useAlbum();

  return (
    <div>
      <span>{`Selected album: ${selectedAlbum?.title}`}</span>
      <button onClick={() => selectAlbum(albums[0])}>Select Album</button>
      <button onClick={() => createNewAlbum("New Album")}>
        Create New Album
      </button>
    </div>
  );
};

describe("<AlbumProvider />", () => {
  beforeEach(() => {
    jest.spyOn(AlbumsAPI, "getAlbums").mockResolvedValue(sampleAlbums);
    jest.spyOn(AlbumsAPI, "createAlbum").mockResolvedValue(true);
  });

  it("should handle initial data loading and other function calls", async () => {
    renderWithProviders(
      <AlbumProvider>
        <TestComponent />
      </AlbumProvider>
    );

    await waitFor(() => {
      fireEvent.click(screen.getByText("Select Album"));
      fireEvent.click(screen.getByText("Create New Album"));
    });
  });

  it("should handle api error", async () => {
    jest.spyOn(AlbumsAPI, "getAlbums").mockResolvedValue(null);
    jest.spyOn(AlbumsAPI, "createAlbum").mockResolvedValue(null);
    renderWithProviders(
      <AlbumProvider>
        <TestComponent />
      </AlbumProvider>
    );

    await waitFor(() => {
      fireEvent.click(screen.getByText("Create New Album"));
    });
  });

  it("should handle misuse", async () => {
    jest.spyOn(console, "error").mockImplementation(() => {});
    expect(() => renderWithProviders(<TestComponent />)).toThrow();
  });
});
