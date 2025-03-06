import { AlbumList } from "./AlbumList";
import { AlbumProvider } from "../_contexts";
import * as AlbumContext from "../_contexts";
import { renderWithProviders } from "@utils/test-utils";
import { sampleAlbums } from "@data/archive";
import { fireEvent, screen } from "@testing-library/dom";

jest.mock("../_contexts", () => ({
  AlbumProvider: ({ children }: { children: React.ReactNode }) => children,
  useAlbum: jest.fn(),
}));
jest.mock("../_modals", () => ({
  AlbumModal: () => <div>AlbumModal</div>,
}));

const render = () => {
  renderWithProviders(
    <AlbumProvider>
      <AlbumList />
    </AlbumProvider>
  );
};

describe("<AlbumList />", () => {
  const defaultContext = {
    albums: sampleAlbums,
    selectedAlbum: null,
    selectAlbum: jest.fn(),
    createNewAlbum: jest.fn(),
    deleteAlbum: jest.fn(),
    editAlbum: jest.fn(),
  };

  beforeEach(() => {
    jest.spyOn(AlbumContext, "useAlbum").mockReturnValue(defaultContext);
  });

  it("renders album list page", async () => {
    render();

    fireEvent.click(screen.getByTestId("open-modal")); // Open create modal
    fireEvent.click(screen.getByTestId("back")); // Navigate back
  });

  it("handles edit and delete", async () => {
    jest
      .spyOn(AlbumContext, "useAlbum")
      .mockReturnValue({
        ...defaultContext,
        selectedAlbum: sampleAlbums[0],
        deleteAlbum: jest.fn().mockResolvedValue(true),
      });
    render();

    fireEvent.click(screen.getAllByTestId("open-edit-modal")[0]); // Open edit modal

    jest.spyOn(window, "confirm").mockReturnValueOnce(false);
    fireEvent.click(screen.getAllByTestId("delete")[0]); // Cancel delete

    jest.spyOn(window, "confirm").mockReturnValueOnce(true);
    fireEvent.click(screen.getAllByTestId("delete")[0]); // Delete
  });
});
