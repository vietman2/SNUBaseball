import { fireEvent, screen, waitFor } from "@testing-library/react";

import { MemberProvider, useMember } from "./MemberContext";
import { sampleMemberMinis } from "@data/user";
import * as MembersAPI from "@services/person/members";
import { renderWithProviders } from "@utils/test-utils";

const TestComponent = () => {
  const { people, selectPerson } = useMember();

  return (
    <div>
      <button onClick={() => selectPerson(null)}>Unselect</button>
      <button onClick={() => selectPerson(people[0])}>Select Person</button>
    </div>
  );
};

describe("<MemberProvider />", () => {
  beforeEach(() => {
    jest.spyOn(window, "alert").mockImplementation(() => {});
    jest.spyOn(MembersAPI, "getMembers").mockResolvedValue(sampleMemberMinis);
  });

  it("fetches members", async () => {
    renderWithProviders(
      <MemberProvider>
        <TestComponent />
      </MemberProvider>
    );

    await waitFor(() => {
      fireEvent.click(screen.getByText("Select Person"));
      fireEvent.click(screen.getByText("Unselect"));
    });
  });

  it("handles api error", async () => {
    jest.spyOn(MembersAPI, "getMembers").mockResolvedValue(null);
    renderWithProviders(
      <MemberProvider>
        <TestComponent />
      </MemberProvider>
    );

    await waitFor(() => {
      fireEvent.click(screen.getByText("Select Person"));
    });
  });

  it("handles misuse", async () => {
    jest.spyOn(console, "error").mockImplementation(() => {});

    expect(() => {
      renderWithProviders(<TestComponent />);
    }).toThrowError();
  });
});
