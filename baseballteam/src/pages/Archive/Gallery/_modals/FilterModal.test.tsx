import { fireEvent, screen } from "@testing-library/react";

import { FilterModal } from "./FilterModal";
import { MemberProvider, TagProvider } from "../_contexts";
import * as Contexts from "../_contexts";
import { sampleTags } from "@data/archive";
import { sampleMemberMinis } from "@data/user";
import { renderWithProviders } from "@utils/test-utils";

jest.mock("../_contexts", () => ({
  MemberProvider: ({ children }: { children: React.ReactNode }) => (
    <div>{children}</div>
  ),
  TagProvider: ({ children }: { children: React.ReactNode }) => (
    <div>{children}</div>
  ),
  useMember: jest.fn(),
  useTag: jest.fn(),
}));

const render = () =>
  renderWithProviders(
    <MemberProvider>
      <TagProvider>
        <FilterModal toggleModal={jest.fn()} />
      </TagProvider>
    </MemberProvider>
  );

describe("<FilterModal />", () => {
  beforeEach(() => {
    jest.spyOn(Contexts, "useMember").mockReturnValue({
      people: sampleMemberMinis,
      selectedPerson: null,
      selectPerson: jest.fn(),
      fetchMembers: jest.fn(),
    });
    jest.spyOn(Contexts, "useTag").mockReturnValue({
      allTags: sampleTags,
      selectedTag: null,
      selectTag: jest.fn(),
    });
  });

  it("renders correctly", () => {
    render();

    fireEvent.click(screen.getByTestId("tag-mode")); // Click tag mode
    fireEvent.click(screen.getByTestId("tag-1")); // Select tag
    fireEvent.click(screen.getByTestId("tag-1")); // Unselect tag
    fireEvent.click(screen.getByTestId("person-mode")); // Click person mode
    fireEvent.change(screen.getByTestId("search-input"), {
      target: { value: "test" },
    }); // Change person input
    fireEvent.click(screen.getByTestId("person-1")); // Select person
    fireEvent.click(screen.getByTestId("person-1")); // Unselect person

    fireEvent.click(screen.getByText("적용")); // Click apply
  });
});
