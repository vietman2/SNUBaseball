import { describe, it, vi } from "vitest";
import { fireEvent } from "@testing-library/react";
import * as Router from "react-router";

import { MyProfileModal } from "../MyProfileModal";
import { renderWithProviders } from "@test-utils/renderer";

describe("MyProfileModal", () => {
  const mockBackgroundLocation = {
    pathname: "/some/path",
    search: "",
    hash: "",
    state: null,
    key: "default",
  } as unknown as Location;

  it("handles logout", () => {
    vi.spyOn(Router, "useLocation").mockReturnValue({
      pathname: "/profile/account",
      search: "",
      hash: "",
      state: { backgroundLocation: mockBackgroundLocation },
    } as unknown as Router.Location);
    vi.spyOn(window, "alert").mockImplementation(() => {});
    const { getByText } = renderWithProviders(
      <MyProfileModal backgroundLocation={mockBackgroundLocation} />
    );

    // cancel logout first time
    vi.spyOn(window, "confirm").mockReturnValueOnce(false);
    fireEvent.click(getByText("로그아웃"));

    // confirm logout second time
    vi.spyOn(window, "confirm").mockReturnValueOnce(true);
    fireEvent.click(getByText("로그아웃"));
  });
});
