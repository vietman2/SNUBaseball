import { fireEvent, screen, waitFor } from "@testing-library/react";

import { UploadModal } from "./UploadModal";
import * as GalleryContext from "@contexts/gallery";
import { sampleTags } from "@data/archive";
import { sampleMemberMinis } from "@data/user";
import * as FilesAPI from "@services/archive/files";
import { renderWithProviders } from "@utils/test-utils";
import { AlbumType, MediaTagType } from "@models/archive";
import { MemberMiniType } from "@models/user";

jest.mock("../Menus/Menus", () => {
  const { sampleAlbums, sampleTags } = jest.requireActual("@data/archive");
  const { sampleMemberMinis } = jest.requireActual("@data/user");
  return {
    AlbumMenu: ({
      handleSelect,
    }: {
      handleSelect: (album: AlbumType | null) => void;
    }) => (
      <>
        <button
          data-testid="album-select"
          onClick={() => handleSelect(sampleAlbums[0])}
        />
        <button data-testid="album-cancel" onClick={() => handleSelect(null)} />
      </>
    ),
    PersonMenu: ({
      selectPerson,
    }: {
      selectPerson: (person: MemberMiniType) => void;
    }) => (
      <button
        data-testid="select-person"
        onClick={() => selectPerson(sampleMemberMinis[0])}
      />
    ),
    TagMenu: ({ selectTag }: { selectTag: (tag: MediaTagType) => void }) => (
      <button
        data-testid="select-tag"
        onClick={() => selectTag(sampleTags[0])}
      />
    ),
  };
});

describe("<UploadModal />", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.spyOn(window, "alert").mockImplementation(() => {});
    jest.spyOn(GalleryContext, "useGallery").mockReturnValue({
      albums: [],
      people: sampleMemberMinis,
      allTags: sampleTags,
      memberQuery: "",
      setMemberQuery: jest.fn(),
      update: jest.fn(),
    });
  });

  it("handle drag and submit fail", async () => {
    renderWithProviders(<UploadModal toggleModal={jest.fn()} />);

    const mockDataTransfer = {
      files: [new File([""], "test.jpg", { type: "image/jpeg" })],
    };
    fireEvent.dragOver(screen.getByTestId("dropzone"), {
      dataTransfer: mockDataTransfer,
    });
    fireEvent.drop(screen.getByTestId("dropzone"), {
      dataTransfer: mockDataTransfer,
    });
    fireEvent.drop(screen.getByTestId("dropzone"), {
      dataTransfer: [],
    });
    fireEvent.dragLeave(screen.getByTestId("dropzone"));

    jest.spyOn(FilesAPI, "uploadFiles").mockResolvedValue(null);
    await waitFor(() => {
      fireEvent.click(screen.getByTestId("submit-new-media"));
    });
  });

  it("handle select file and submit with filters (success)", async () => {
    renderWithProviders(<UploadModal toggleModal={jest.fn()} />);

    // mock file that is large
    const mockFile = new File([""], "test1.jpg", { type: "image/jpeg" });
    const mockLargeFile = new File([""], "test2.jpg", { type: "image/jpeg" });
    Object.defineProperty(mockLargeFile, "size", { value: 10000000 });

    // select files and remove one
    fireEvent.change(screen.getByTestId("file-input"), {
      target: { files: [mockFile, mockLargeFile] },
    }); // select files
    fireEvent.click(screen.getAllByTestId("remove-file")[0]); // remove file

    // select options
    fireEvent.click(screen.getByTestId("album-button")); // open album menu
    fireEvent.click(screen.getByTestId("album-cancel")); // cancel
    fireEvent.click(screen.getByTestId("album-select")); // select album
    fireEvent.click(screen.getByTestId("tag-button")); // open tag menu
    fireEvent.click(screen.getByTestId("select-tag")); // select tag
    fireEvent.click(screen.getByTestId("select-tag")); // unselect tag
    fireEvent.click(screen.getByTestId("select-tag")); // reselect tag
    fireEvent.click(screen.getByTestId("person-button")); // open person menu
    fireEvent.click(screen.getByTestId("select-person")); // select person
    fireEvent.click(screen.getByTestId("select-person")); // unselect person
    fireEvent.click(screen.getByTestId("select-person")); // reselect person

    jest.spyOn(FilesAPI, "uploadFiles").mockImplementation((_, progress) => {
      progress(90);

      return Promise.resolve(true);
    });
    await waitFor(() => {
      fireEvent.click(screen.getByTestId("submit-new-media"));
    });
  });
});
