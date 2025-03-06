import { fireEvent, screen } from "@testing-library/react";

import { AlbumModal } from "./AlbumModal";
import { AlbumProvider } from "../_contexts";
import * as AlbumContext from "../_contexts";
import { sampleAlbums } from "@data/archive";
import { renderWithProviders } from "@utils/test-utils";

jest.mock("../_contexts", () => ({
  AlbumProvider: ({ children }: { children: React.ReactNode }) => children,
  useAlbum: jest.fn(),
}));

const render = () => {
  renderWithProviders(
    <AlbumProvider>
      <AlbumModal toggleModal={jest.fn()} />
    </AlbumProvider>
  );
};

describe("<AlbumModal />", () => {
  const defaultContext = {
    createNewAlbum: jest.fn(),
    editAlbum: jest.fn().mockResolvedValue(true),
    selectedAlbum: null,
    deleteAlbum: jest.fn(),
    albums: [],
    selectAlbum: jest.fn(),
  };

  beforeEach(() => {
    jest.spyOn(window, "alert").mockImplementation(() => {});
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it("handles edit correctly", async () => {
    jest.spyOn(AlbumContext, "useAlbum").mockReturnValue({
      ...defaultContext,
      selectedAlbum: sampleAlbums[0],
      editAlbum: jest.fn().mockResolvedValue(false),
    });

    render();

    fireEvent.change(screen.getByTestId("album-title-input"), {
      target: { value: "New Title" },
    });
    fireEvent.click(screen.getByTestId("checkbox"));
    fireEvent.click(screen.getByText("저장"));
  });

  it("handles edit fail", async () => {
    jest.spyOn(AlbumContext, "useAlbum").mockReturnValue({
      ...defaultContext,
      selectedAlbum: sampleAlbums[0],
      editAlbum: jest.fn().mockResolvedValue(true),
    });

    render();

    fireEvent.click(screen.getByText("저장"));
  });

  it("handles create correctly", async () => {
    jest.spyOn(AlbumContext, "useAlbum").mockReturnValue({
      ...defaultContext,
      createNewAlbum: jest.fn().mockResolvedValue(true),
    });

    render();

    fireEvent.click(screen.getByText("앨범 만들기"));
  });

  it("handles create fail", async () => {
    jest.spyOn(AlbumContext, "useAlbum").mockReturnValue({
      ...defaultContext,
      createNewAlbum: jest.fn().mockResolvedValue(false),
    });

    render();

    fireEvent.click(screen.getByText("앨범 만들기"));
  });
});
