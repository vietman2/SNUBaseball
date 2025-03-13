import { fireEvent, screen } from "@testing-library/react";

import { FilterModal } from "./FilterModal";
import * as GalleryContext from "@contexts/gallery";
import { sampleTags } from "@data/archive";
import { sampleMemberMinis } from "@data/user";
import { renderWithProviders } from "@utils/test-utils";

describe("<FilterModal />", () => {
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

  it("handles filters correctly", () => {
    renderWithProviders(
      <FilterModal
        selectedTag={null}
        selectedMember={null}
        setSelectedTag={jest.fn()}
        setSelectedMember={jest.fn()}
        toggleModal={jest.fn()}
      />
    );

    fireEvent.click(screen.getByTestId("reset")); // Reset filters
    fireEvent.click(screen.getByTestId("cancel")); // Close modal
    fireEvent.click(screen.getByTestId("tag-mode")); // Select tag mode
    fireEvent.click(screen.getByTestId("tag-1")); // Select tag-1
    fireEvent.click(screen.getByTestId("tag-1")); // Unselect tag-1
    fireEvent.click(screen.getByTestId("person-mode")); // Select person mode
    fireEvent.change(screen.getByTestId("search-input"), {
      target: { value: "search query" },
    }); // Search for person
    fireEvent.click(screen.getByTestId("person-1")); // Select person-1
    fireEvent.click(screen.getByTestId("person-1")); // Unselect person-1
    fireEvent.click(screen.getByTestId("apply")); // Apply filters
  });
});
