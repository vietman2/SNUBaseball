import { fireEvent, render, screen, waitFor } from "@testing-library/react";

import { Members } from "./Members";
import * as MemberAPI from "@services/person/members";

describe("<Members />", () => {
  it("renders correctly", async () => {
    jest.spyOn(MemberAPI, "getMembers").mockResolvedValue(false);

    await waitFor(() => render(<Members />));

    fireEvent.click(screen.getByTestId("신입부원 추가"));
  });
  
  it("fetches members list correctly", async () => {
    jest.spyOn(MemberAPI, "getMembers").mockResolvedValue(true);

    await waitFor(() => render(<Members />));

    fireEvent.click(screen.getByTestId("신입부원 추가"));
  });
});
