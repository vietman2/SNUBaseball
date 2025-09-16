import { describe, expect, it, vi } from "vitest";
import { render } from "@testing-library/react";
import * as Router from "react-router";

import { RouterProvider } from "../router/RouterProvider";

vi.unmock("@shared/lib/router");

describe("RouterProvider", () => {
    const mockBackgroundLocation = {
      pathname: "/background",
      search: "123",
      hash: "456",
      key: "789",
    };
    const mockLocation = {
      pathname: "/test",
      search: "",
      hash: "",
      key: "123",
      state: null,
    };

  it("should render no modal correctly", () => {
    vi.spyOn(Router, "useLocation").mockReturnValue(mockLocation);

    const { getByText } = render(
      <RouterProvider>
        <div>Test Child</div>
      </RouterProvider>
    );

    expect(getByText("Test Child")).toBeInTheDocument();
  });

  it("should handle modal state correctly", () => {
    // Mock useLocation to return a location with background state
    vi.spyOn(Router, "useLocation").mockReturnValue({
      ...mockLocation,
      state: { backgroundLocation: mockBackgroundLocation },
    });

    const { getByText } = render(
      <RouterProvider>
        <div>Test Child</div>
      </RouterProvider>
    );

    expect(getByText("Test Child")).toBeInTheDocument();
  });
});
