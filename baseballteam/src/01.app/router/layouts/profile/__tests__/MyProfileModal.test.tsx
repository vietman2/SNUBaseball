import { describe, it, vi } from "vitest";
import { fireEvent } from "@testing-library/react";

import { MyProfileModal } from "../MyProfileModal";
import { renderWithProviders } from "@test-utils/renderer";

describe("MyProfileModal", () => {
  it("handles logout", () => {
    vi.spyOn(window, "alert").mockImplementation(() => {});
    const { getByText } = renderWithProviders(<MyProfileModal />);
   
    // cancel logout first time
    vi.spyOn(window, "confirm").mockReturnValueOnce(false);
    fireEvent.click(getByText("로그아웃"));

    // confirm logout second time
    vi.spyOn(window, "confirm").mockReturnValueOnce(true);
    fireEvent.click(getByText("로그아웃"));
  });
});
