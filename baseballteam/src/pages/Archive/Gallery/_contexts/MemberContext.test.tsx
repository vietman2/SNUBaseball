import { fireEvent, screen, waitFor } from "@testing-library/react";

import { MemberProvider, useMember } from "./MemberContext";
import { sampleMemberMinis } from "@data/user";
import * as MembersAPI from "@services/person/members";
import { renderWithProviders } from "@utils/test-utils";

const TestComponent = () => {
  const { people, selectPerson, fetchMembers } = useMember();

  return (
    <div>
      <button onClick={() => selectPerson(people[0])}>Select Person</button>
      <button onClick={() => fetchMembers("query")}>Fetch Members</button>
    </div>
  );
};

describe("<MemberProvider />", () => {
  beforeEach(() => {
    jest.spyOn(window, "alert").mockImplementation(() => {});
    jest
      .spyOn(MembersAPI, "searchMembers")
      .mockResolvedValue(sampleMemberMinis);
  });

  it("fetches members", async () => {
    renderWithProviders(
      <MemberProvider>
        <TestComponent />
      </MemberProvider>
    );

    await waitFor(() => {
      fireEvent.click(screen.getByText("Select Person"));
      fireEvent.click(screen.getByText("Fetch Members"));
    });
  });

  it("handles api error", async () => {
    jest.spyOn(MembersAPI, "searchMembers").mockResolvedValue(null);
    renderWithProviders(
      <MemberProvider>
        <TestComponent />
      </MemberProvider>
    );

    await waitFor(() => {
      fireEvent.click(screen.getByText("Select Person"));
      fireEvent.click(screen.getByText("Fetch Members"));
    });
  });

  it("handles misuse", async () => {
    jest.spyOn(console, "error").mockImplementation(() => {});

    expect(() => {
      renderWithProviders(<TestComponent />);
    }).toThrowError();
  });
});
