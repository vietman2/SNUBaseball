import { fireEvent, screen, waitFor } from "@testing-library/react";

import { UploadModal } from "./UploadModal";
import { AlbumProvider, FilesProvider } from "../_contexts";
import * as Contexts from "../_contexts";
import { sampleAlbums } from "@data/archive";
import { AlbumType, MediaTagType } from "@models/archive";
import { MemberMiniType } from "@models/user";
import { renderWithProviders } from "@utils/test-utils";

jest.mock("./Menus", () => {
  const { sampleAlbums, sampleTags } = jest.requireActual("@data/archive");
  const { sampleMemberMinis } = jest.requireActual("@data/user");

  return {
    AlbumMenu: ({
      handleSelect,
    }: {
      handleSelect: (album: AlbumType | null) => void;
    }) => (
      <button onClick={() => handleSelect(sampleAlbums[0])}>AlbumMenu</button>
    ),
    PersonMenu: ({
      selectPerson,
    }: {
      selectPerson: (person: MemberMiniType) => void;
    }) => (
      <button onClick={() => selectPerson(sampleMemberMinis[0])}>
        PersonMenu
      </button>
    ),
    TagMenu: ({ selectTag }: { selectTag: (tag: MediaTagType) => void }) => (
      <button onClick={() => selectTag(sampleTags[0])}>TagMenu</button>
    ),
  };
});
jest.mock("../_contexts", () => ({
  AlbumProvider: ({ children }: { children: React.ReactNode }) => children,
  FilesProvider: ({ children }: { children: React.ReactNode }) => children,
  useAlbum: jest.fn(),
  useFiles: jest.fn(),
}));

const render = () => {
  return renderWithProviders(
    <AlbumProvider>
      <FilesProvider>
        <UploadModal toggleModal={jest.fn()} />
      </FilesProvider>
    </AlbumProvider>
  );
};

describe("<UploadModal />", () => {
  const files = [
    // small file (less than 1MB)
    new File(["(⌐□_□)"], "small-file.jpg", { type: "image/jpeg" }),
    // large file (more than 1MB)
    new File([new ArrayBuffer(1024 * 1024 * 2)], "large-file.jpg", {
      type: "image/jpeg",
    }),
  ];
  const defaultAlbumContext = {
    albums: sampleAlbums,
    selectedAlbum: null,
    selectAlbum: jest.fn(),
    createNewAlbum: jest.fn(),
    deleteAlbum: jest.fn(),
    editAlbum: jest.fn(),
  };
  const defaultFilesContext = {
    uploadedFiles: files,
    progress: 10,
    dropFiles: jest.fn(),
    removeFile: jest.fn(),
    submitFiles: jest.fn(),
  };

  beforeEach(() => {
    jest.spyOn(Contexts, "useAlbum").mockReturnValue(defaultAlbumContext);
    jest.spyOn(Contexts, "useFiles").mockReturnValue(defaultFilesContext);
  });

  it("handles file drops and submit", async () => {
    jest.spyOn(Contexts, "useFiles").mockReturnValue({
      ...defaultFilesContext,
      submitFiles: jest.fn().mockResolvedValue(true),
    });
    render();

    const data = {
      dataTransfer: {
        files,
      },
    };

    await waitFor(() =>
      expect(screen.getByTestId("dropzone")).toBeInTheDocument()
    );

    // Drag and drop files
    fireEvent.dragOver(screen.getByTestId("dropzone"), data);
    fireEvent.drop(screen.getByTestId("dropzone"), data);
    fireEvent.dragLeave(screen.getByTestId("dropzone"));

    // Add files manually
    fireEvent.change(screen.getByTestId("file-input"), {
      target: { files },
    });
    // Remove a file
    fireEvent.click(screen.getAllByTestId("remove-file")[0]);

    // Select options
    fireEvent.click(screen.getByTestId("album-button")); // open album menu
    fireEvent.click(screen.getByText("AlbumMenu")); // select album
    fireEvent.click(screen.getByTestId("tag-button")); // open tag menu
    fireEvent.click(screen.getByText("TagMenu")); // select tag
    fireEvent.click(screen.getByText("TagMenu")); // unselect tag
    fireEvent.click(screen.getByText("TagMenu")); // reselect tag
    fireEvent.click(screen.getByTestId("person-button")); // open person menu
    fireEvent.click(screen.getByText("PersonMenu")); // select person
    fireEvent.click(screen.getByText("PersonMenu")); // unselect person
    fireEvent.click(screen.getByText("PersonMenu")); // reselect person

    fireEvent.click(screen.getByTestId("submit-new-media"));
  });

  it("handles api error", async () => {
    jest.spyOn(Contexts, "useFiles").mockReturnValue({
      ...defaultFilesContext,
      submitFiles: jest.fn().mockResolvedValue(null),
    });
    render();

    fireEvent.click(screen.getByTestId("submit-new-media"));
  });
});
