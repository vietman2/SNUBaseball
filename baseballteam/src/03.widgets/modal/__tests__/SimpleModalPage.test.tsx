import { beforeEach, describe, expect, it, vi } from "vitest";
import { fireEvent, waitFor } from "@testing-library/react";

import { SimpleModalPage } from "@widgets/modal";
import { renderWithProviders } from "@test-utils/renderer";

const navigateMock = vi.fn();
vi.mock("react-router", async () => {
  const actual = await vi.importActual("react-router");
  return {
    ...actual,
    useNavigate: () => navigateMock,
  };
});

describe("SimpleModalPage", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders and handles close correctly", async () => {
    const { getByTestId, getByText } = renderWithProviders(
      <SimpleModalPage onCloseTarget="/test">Modal Content</SimpleModalPage>
    );

    expect(getByText("Modal Content")).toBeInTheDocument();

    // clicing inside the modal does nothing
    fireEvent.click(getByText("Modal Content"));
    expect(navigateMock).not.toHaveBeenCalled();

    // clicking outside the modal triggers close
    fireEvent.click(getByTestId("modal-overlay"));

    await waitFor(() => {
      expect(navigateMock).toHaveBeenCalledWith("/test");
    });
  });

  it("handles Escape key to close modal", async () => {
    renderWithProviders(
      <SimpleModalPage onCloseTarget="/test">Modal Content</SimpleModalPage>
    );

    // any other key does nothing
    fireEvent.keyDown(window, { key: "Enter" });
    expect(navigateMock).not.toHaveBeenCalled();

    fireEvent.keyDown(window, { key: "Escape" });

    await waitFor(() => {
      expect(navigateMock).toHaveBeenCalledWith("/test");
    });
  });
});
