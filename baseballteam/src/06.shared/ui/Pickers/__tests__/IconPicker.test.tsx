import { describe, it, expect, vi } from "vitest";
import { fireEvent } from "@testing-library/react";

import { IconPicker } from "@shared/ui/Pickers";
import { renderWithProviders } from "@test-utils/renderer";

vi.unmock("@shared/ui/Pickers");

describe("IconPicker", () => {
  it("renders IconPicker component", async () => {
    const onChangeMock = vi.fn();

    const { getByTestId, getByText } = renderWithProviders(
      <IconPicker
        options={["baseball", "basketball", "football"]}
        icon="baseball"
        onChange={onChangeMock}
      />
    );

    expect(getByTestId("icon-picker-display")).toBeInTheDocument();

    fireEvent.click(getByTestId("icon-picker-display"));

    expect(getByText("basketball-icon")).toBeInTheDocument();
    expect(getByText("football-icon")).toBeInTheDocument();

    fireEvent.pointerDown(getByText("football-icon"));
    fireEvent.click(getByTestId("icon-option-football"));

    expect(onChangeMock).toHaveBeenCalledWith("football");
  });
});
