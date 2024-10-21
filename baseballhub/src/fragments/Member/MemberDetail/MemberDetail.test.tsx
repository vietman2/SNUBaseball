import { screen, waitFor } from "@testing-library/react";

import { MemberDetail } from "./MemberDetail";
import { sampleMemberDetail } from "@data/user";
import * as MemberAPI from "@services/person/members";
import { renderWithProviders } from "@utils/test-utils";

describe("<MemberDetail />", () => {
  it("handles null memberId correctly", () => {
    renderWithProviders(<MemberDetail memberId={null} goBack={() => {}} />);
  });

  it("handles bad response correctly", () => {
    jest.spyOn(MemberAPI, "getMemberDetail").mockResolvedValue(null);
    waitFor(() =>
      renderWithProviders(<MemberDetail memberId={1} goBack={() => {}} />)
    );
  });

  it("renders correctly", async () => {
    jest.spyOn(MemberAPI, "getMemberDetail").mockResolvedValue({
      status: 200,
      data: sampleMemberDetail,
    });
    waitFor(() =>  renderWithProviders(<MemberDetail memberId={1} goBack={() => {}} />));

    await waitFor(() => expect(screen.getByText("등번호")).toBeInTheDocument());
  });
});
