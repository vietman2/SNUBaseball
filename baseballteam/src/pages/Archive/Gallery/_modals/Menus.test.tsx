import { fireEvent, screen } from "@testing-library/react";

import { AlbumMenu, TagMenu, PersonMenu } from "./Menus";
import { AlbumProvider, MemberProvider, TagProvider } from "../_contexts";
import * as Contexts from "../_contexts";
import { sampleAlbums, sampleTags } from "@data/archive";
import { sampleMemberMinis } from "@data/user";
import { renderWithProviders } from "@utils/test-utils";

jest.mock("../_contexts", () => ({
  AlbumProvider: ({ children }: { children: React.ReactNode }) => children,
  MemberProvider: ({ children }: { children: React.ReactNode }) => children,
  TagProvider: ({ children }: { children: React.ReactNode }) => children,
  useAlbum: jest.fn(),
  useMember: jest.fn(),
  useTag: jest.fn(),
}));

describe("<AlbumMenu />", () => {
  beforeEach(() => {
    jest.spyOn(Contexts, "useAlbum").mockReturnValue({
      albums: sampleAlbums,
      selectedAlbum: null,
      selectAlbum: jest.fn(),
      createNewAlbum: jest.fn(),
      deleteAlbum: jest.fn(),
      editAlbum: jest.fn(),
    });
  });

  it("renders selected and handles click outside", () => {
    renderWithProviders(
      <AlbumProvider>
        <AlbumMenu
          toggleMenu={jest.fn()}
          selectedAlbum={sampleAlbums[0]}
          handleSelect={jest.fn()}
        />
      </AlbumProvider>
    );

    fireEvent.click(screen.getAllByTestId("album-button")[0]); // Click album
    fireEvent.mouseDown(screen.getByTestId("wrapper")); // Click inside
    fireEvent.mouseDown(document.body); // Click outside
  });
});

describe("<TagMenu />", () => {
  beforeEach(() => {
    jest.spyOn(Contexts, "useTag").mockReturnValue({
      allTags: sampleTags,
      selectedTags: [],
      selectTag: jest.fn(),
    });
  });

  it("renders without crashing", () => {
    renderWithProviders(
      <TagProvider>
        <TagMenu
          toggleMenu={jest.fn()}
          selectedTags={[sampleTags[0]]}
          selectTag={jest.fn()}
        />
      </TagProvider>
    );

    fireEvent.click(screen.getAllByTestId("tag-button")[0]); // Click tag
  });
});

describe("<PersonMenu />", () => {
  beforeEach(() => {
    jest.spyOn(Contexts, "useMember").mockReturnValue({
      people: sampleMemberMinis,
      selectedPerson: null,
      selectPerson: jest.fn(),
      fetchMembers: jest.fn(),
    });
  });

  it("handles search correctly", () => {
    renderWithProviders(
      <MemberProvider>
        <PersonMenu
          toggleMenu={jest.fn()}
          selectedPeople={[sampleMemberMinis[0]]}
          selectPerson={jest.fn()}
        />
      </MemberProvider>
    );

    fireEvent.change(screen.getByTestId("search-input"), {
      target: { value: "test" },
    });
    fireEvent.click(screen.getAllByTestId("person-button")[0]); // Click person
    fireEvent.click(screen.getAllByTestId("selected-person")[0]); // Unselect
  });
});
