import { fireEvent, screen } from "@testing-library/react";

import { AlbumMenu, TagMenu, PersonMenu } from "./Menus";
import { sampleAlbums, sampleTags } from "@data/archive";
import { sampleMemberMinis } from "@data/user";
import { renderWithProviders } from "@utils/test-utils";

describe("<AlbumMenu />", () => {
  it("renders without crashing", () => {
    renderWithProviders(
      <AlbumMenu
        toggleMenu={jest.fn()}
        albums={sampleAlbums}
        selectedAlbum={sampleAlbums[0]}
        handleSelect={jest.fn()}
      />
    );

    fireEvent.click(screen.getByTestId("album-1")); // Select album
    fireEvent.mouseDown(screen.getByTestId("wrapper")); // Click inside
    fireEvent.mouseDown(document.body); // Click outside
  });
});

describe("<TagMenu />", () => {
  it("renders without crashing", () => {
    renderWithProviders(
      <TagMenu
        toggleMenu={jest.fn()}
        allTags={sampleTags}
        selectedTags={[sampleTags[0]]}
        selectTag={jest.fn()}
      />
    );

    fireEvent.click(screen.getByTestId("tag-1"));
  });
});

describe("<PersonMenu />", () => {
  it("renders without crashing", () => {
    renderWithProviders(
      <PersonMenu
        toggleMenu={jest.fn()}
        people={sampleMemberMinis}
        selectedPeople={[sampleMemberMinis[0]]}
        selectPerson={jest.fn()}
        searchQuery=""
        setSearchQuery={jest.fn()}
      />
    );

    fireEvent.change(screen.getByTestId("search-input"), {
      target: { value: "test" },
    });
    fireEvent.click(screen.getByTestId("member-1"));
    fireEvent.click(screen.getByTestId("selected-person")); // Clear selected person
  });
});
