import { fireEvent, screen } from "@testing-library/react";

import { AlbumModal, TagModal } from "./CreateModals";
import * as GalleryContext from "@contexts/gallery";
import { sampleAlbums } from "@data/archive";
import * as AlbumsAPI from "@services/archive/albums";
import * as TagsAPI from "@services/archive/tags";
import { renderWithProviders } from "@utils/test-utils";

describe("<AlbumModal />", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.spyOn(window, "alert").mockImplementation(() => {});
    jest.spyOn(GalleryContext, "useGallery").mockReturnValue({
      albums: [],
      people: [],
      allTags: [],
      memberQuery: "",
      setMemberQuery: jest.fn(),
      update: jest.fn(),
    });
  });

  it("handles edit", () => {
    renderWithProviders(
      <AlbumModal selectedAlbum={sampleAlbums[0]} toggleModal={jest.fn()} />
    );

    jest.spyOn(AlbumsAPI, "updateAlbum").mockResolvedValueOnce(null);
    fireEvent.click(screen.getByTestId("submit-album"));

    jest.spyOn(AlbumsAPI, "updateAlbum").mockResolvedValue(true);
    fireEvent.click(screen.getByTestId("submit-album"));
  });

  it("handles create", () => {
    renderWithProviders(
      <AlbumModal selectedAlbum={null} toggleModal={jest.fn()} />
    );

    fireEvent.change(screen.getByTestId("album-title-input"), {
      target: { value: "New Album" },
    });
    fireEvent.click(screen.getByTestId("checkbox"));

    jest.spyOn(AlbumsAPI, "createAlbum").mockResolvedValueOnce(null);
    fireEvent.click(screen.getByTestId("submit-album"));

    jest.spyOn(AlbumsAPI, "createAlbum").mockResolvedValue(true);
    fireEvent.click(screen.getByTestId("submit-album"));
  });
});

describe("<TagModal />", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.spyOn(window, "alert").mockImplementation(() => {});
    jest.spyOn(GalleryContext, "useGallery").mockReturnValue({
      albums: [],
      people: [],
      allTags: [],
      memberQuery: "",
      setMemberQuery: jest.fn(),
      update: jest.fn(),
    });
  });

  it("renders TagModal", () => {
    renderWithProviders(<TagModal toggleModal={jest.fn()} />);

    fireEvent.click(screen.getByTestId("submit-tag"));

    fireEvent.change(screen.getByTestId("tag-name-input"), {
      target: { value: "New Tag" },
    });

    jest.spyOn(TagsAPI, "createTag").mockResolvedValueOnce(null);
    fireEvent.click(screen.getByTestId("submit-tag"));

    jest.spyOn(TagsAPI, "createTag").mockResolvedValue(true);
    fireEvent.click(screen.getByTestId("submit-tag"));
  });
});
