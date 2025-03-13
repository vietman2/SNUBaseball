import { fireEvent, screen, waitFor } from "@testing-library/react";

import { AlbumList } from "./AlbumList";
import { GalleryProvider } from "@contexts/gallery";
import * as GalleryContext from "@contexts/gallery";
import { sampleAlbums, sampleTags } from "@data/archive";
import * as AlbumsAPI from "@services/archive/albums";
import { renderWithProviders } from "@utils/test-utils";

jest.mock("@contexts/gallery", () => ({
  GalleryProvider: ({ children }: { children: React.ReactNode }) => children,
  useGallery: jest.fn(),
}));
jest.mock("@fragments/Gallery", () => ({
  AlbumModal: () => <div />,
  AlbumSimple: ({
    onEdit,
    onDelete,
  }: {
    onEdit: () => void;
    onDelete: () => void;
  }) => (
    <>
      <button onClick={onEdit} data-testid="edit-album" />
      <button onClick={onDelete} data-testid="delete-album" />
    </>
  ),
  TagModal: () => <div />,
}));

describe("<AlbumList />", () => {
  const defaultContext = {
    albums: sampleAlbums,
    people: [],
    allTags: sampleTags,
    memberQuery: "",
    updateCount: 0,
    setMemberQuery: jest.fn(),
    update: jest.fn(),
  };

  beforeEach(() => {
    jest.spyOn(window, "alert").mockImplementation(() => {});
    jest.spyOn(GalleryContext, "useGallery").mockReturnValue(defaultContext);
  });

  it("renders album list and handles album actions", async () => {
    renderWithProviders(
      <GalleryProvider>
        <AlbumList />
      </GalleryProvider>
    );

    fireEvent.click(screen.getByTestId("open-album-modal")); // Open create album modal
    fireEvent.click(screen.getAllByTestId("edit-album")[0]); // Open edit album modal

    jest.spyOn(window, "confirm").mockReturnValueOnce(false);
    fireEvent.click(screen.getAllByTestId("delete-album")[0]); // Delete album cancel

    jest.spyOn(window, "confirm").mockReturnValue(true);
    jest.spyOn(AlbumsAPI, "removeAlbum").mockResolvedValueOnce(null);
    await waitFor(() => {
      fireEvent.click(screen.getAllByTestId("delete-album")[0]); // Delete album fail
    });

    jest.spyOn(AlbumsAPI, "removeAlbum").mockResolvedValueOnce(true);
    await waitFor(() => {
      fireEvent.click(screen.getAllByTestId("delete-album")[0]); // Delete album success
    });
  });

  it("handles tag actions and go back", async () => {
    renderWithProviders(
      <GalleryProvider>
        <AlbumList />
      </GalleryProvider>
    );

    fireEvent.click(screen.getByTestId("open-tag-modal")); // Open tag modal
    fireEvent.click(screen.getByTestId("back")); // Navigate back
  });
});
