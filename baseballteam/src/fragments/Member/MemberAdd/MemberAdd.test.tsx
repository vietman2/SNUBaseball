import { fireEvent, screen, waitFor } from "@testing-library/react";

import { MemberAdd } from "./MemberAdd";
import * as MembersAPI from "@services/person/members";
import { renderWithProviders } from "@utils/test-utils";

describe("<MemberAdd />", () => {
  it("handles submit correctly", async () => {
    jest.spyOn(window, "alert").mockImplementation(() => null);
    jest.spyOn(MembersAPI, "createMember").mockResolvedValue(true);
    renderWithProviders(<MemberAdd handleClose={jest.fn()} />);

    await waitFor(() => {
      fireEvent.change(screen.getByTestId("lastName"), {
        target: { value: "김" },
      });
      fireEvent.change(screen.getByTestId("firstName"), {
        target: { value: "철수" },
      });
      fireEvent.change(screen.getByTestId("admissionYear"), {
        target: { value: "2024" },
      });
    });

    await waitFor(() => fireEvent.click(screen.getByText("추가")));
  });

  it("handles bad response", async () => {
    jest.spyOn(window, "alert").mockImplementation(() => null);
    jest.spyOn(MembersAPI, "createMember").mockResolvedValue(null);
    renderWithProviders(<MemberAdd handleClose={jest.fn()} />);

    await waitFor(() => fireEvent.click(screen.getByText("추가")));
  });
});
