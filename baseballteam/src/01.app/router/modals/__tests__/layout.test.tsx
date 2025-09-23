import { beforeEach, describe, expect, it, vi } from "vitest";
import { fireEvent } from "@testing-library/react";

import { ModalLayout } from "../layout";
import * as RouterAPI from "@shared/lib/router";
import { renderWithProviders } from "@test-utils/renderer";

describe("ModalLayout", () => {
  const mockLocation = {
    pathname: "",
    search: "",
    hash: "",
    key: "",
    state: null,
  };

  beforeEach(() => {
    vi.useFakeTimers();
    vi.spyOn(RouterAPI, "useRouter").mockReturnValue({
      isModal: true,
      backgroundLocation: mockLocation,
      displayLocation: mockLocation,
    });
  });

  it("should render and handle overlay click", () => {
    const { getByTestId } = renderWithProviders(<ModalLayout />);

    // test if dialog click doesn't close modal
    fireEvent.mouseDown(getByTestId("modal-dialog"));

    expect(getByTestId("modal-dialog")).toBeInTheDocument();

    fireEvent.mouseDown(getByTestId("modal-overlay"));

    vi.advanceTimersByTime(90);

    // overlay click during closing animation (coverage purpose)
    fireEvent.mouseDown(getByTestId("modal-overlay"));

    vi.advanceTimersByTime(90);
  });

  it("should handle Escape key press with history", () => {
    vi.spyOn(window.history, "length", "get").mockReturnValue(3);

    const { getByTestId } = renderWithProviders(<ModalLayout />);

    // test if non-Escape key doesn't close modal
    fireEvent.keyDown(getByTestId("modal-overlay"), {
      key: "Enter",
      code: "Enter",
    });

    vi.advanceTimersByTime(180);

    expect(getByTestId("modal-dialog")).toBeInTheDocument();

    fireEvent.keyDown(getByTestId("modal-overlay"), {
      key: "Escape",
      code: "Escape",
    });

    vi.advanceTimersByTime(180);
  });

  describe("COVERAGE PURPOSE", () => {
    it("should handle redirect to home if not modal", () => {
      vi.spyOn(RouterAPI, "useRouter").mockReturnValue({
        isModal: false,
        backgroundLocation: mockLocation,
        displayLocation: mockLocation,
      });

      const { getByTestId } = renderWithProviders(<ModalLayout />);

      fireEvent.keyDown(getByTestId("modal-overlay"), {
        key: "Escape",
        code: "Escape",
      });

      vi.advanceTimersByTime(180);
    });

    it("should handle no timerRef on unmount", () => {
      const { unmount } = renderWithProviders(<ModalLayout />);

      unmount();
    });
  });
});
