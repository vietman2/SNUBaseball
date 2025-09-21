import { describe, expect, it, vi } from "vitest";
import { fireEvent } from "@testing-library/react";

import { EditButton } from "@shared/ui/Buttons";
import { renderWithProviders } from "@test-utils/renderer";

vi.unmock("@shared/ui/Buttons");

describe("EditButton", () => {
  it("should render EditButton correctly", () => {
    const onClickMock = vi.fn();

    const { getByText } = renderWithProviders(
      <EditButton onClick={onClickMock} label="Edit" color="blue" />
    );

    fireEvent.click(getByText("Edit"));

    expect(onClickMock).toHaveBeenCalled();
  });

  it("should render EditButton correctly with default props", () => {
    const onClickMock = vi.fn();

    const { getByText } = renderWithProviders(
      <EditButton onClick={onClickMock} />
    );

    fireEvent.click(getByText("변경하기"));

    expect(onClickMock).toHaveBeenCalled();
  });
});
