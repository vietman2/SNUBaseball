import { fireEvent, render, screen, waitFor } from "@testing-library/react";

import Members from "./Members";
import * as MajorAPI from "@services/person/majors";
import * as MemberAPI from "@services/person/members";
import { sampleColleges } from "@constants/data/colleges";
import { samplePeople } from "@constants/data/people";

jest.mock("@fragments/Members", () => ({
  NewMemberModal: ({
    onClose,
    onSubmit,
  }: {
    onClose: () => void;
    onSubmit: () => void;
  }) => (
    <div data-testid="new-member-modal">
      <button onClick={onClose} data-testid="close">
        Close
      </button>
      <button onClick={onSubmit} data-testid="submit">
        Submit
      </button>
    </div>
  ),
  MembersTable: () => <div data-testid="members-table" />,
}));

describe("<Members />", () => {
  it("renders without crashing", async () => {
    jest.spyOn(MajorAPI, "getMajors").mockResolvedValue(false);
    jest.spyOn(MemberAPI, "getMembers").mockResolvedValue(false);

    await waitFor(() => render(<Members />));

    fireEvent.click(screen.getByTestId("신입부원 추가"));
    fireEvent.click(screen.getByTestId("close"));
  });

  it("handles add member correctly", async () => {
    jest.spyOn(MajorAPI, "getMajors").mockResolvedValue(sampleColleges);
    jest.spyOn(MemberAPI, "getMembers").mockResolvedValue(samplePeople);
    jest.spyOn(MemberAPI, "addMember").mockResolvedValue(true);

    await waitFor(() => render(<Members />));

    fireEvent.click(screen.getByTestId("신입부원 추가"));
    waitFor(() => fireEvent.click(screen.getByTestId("submit")));
  });
  

  it("handles add member fail", async () => {
    jest.spyOn(MajorAPI, "getMajors").mockResolvedValue(sampleColleges);
    jest.spyOn(MemberAPI, "getMembers").mockResolvedValue(samplePeople);
    jest.spyOn(MemberAPI, "addMember").mockResolvedValue(false);

    await waitFor(() => render(<Members />));

    fireEvent.click(screen.getByTestId("신입부원 추가"));
    waitFor(() => fireEvent.click(screen.getByTestId("submit")));
  });
});
