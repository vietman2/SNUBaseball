import { fireEvent, screen, waitFor } from "@testing-library/react";
import * as Router from "react-router-dom";

import { MemberDetail } from "./MemberDetail";
import { sampleMembers } from "@data/user";
import * as MembersAPI from "@services/person/members";
import { renderWithProviders } from "@utils/test-utils";

describe("<MemberDetail />", () => {
  beforeEach(() => {
    jest.spyOn(Router, "useParams").mockReturnValue({
      memberId: "1",
    });
    jest
      .spyOn(MembersAPI, "getMemberDetail")
      .mockResolvedValue(sampleMembers[0]);
  });

  it("handles bad response", async () => {
    jest.spyOn(MembersAPI, "getMemberDetail").mockResolvedValue(null);
    renderWithProviders(<MemberDetail />);

    await waitFor(() => {
      fireEvent.click(screen.getByText("뒤로가기"));
    });
  });

  it("handles navigate to edit", async () => {
    renderWithProviders(<MemberDetail />);

    await waitFor(() => {
      fireEvent.click(screen.getByTestId("toggle"));
      fireEvent.click(screen.getByText("수정하기"));
      fireEvent.click(screen.getByTestId("back"));
    });
  });
});
