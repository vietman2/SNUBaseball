import { describe, expect, it, vi } from "vitest";

import { DeleteButton } from "@shared/ui/Buttons";
import { renderWithProviders } from "@test-utils/renderer";

vi.unmock("@shared/ui/Buttons");

describe("DeleteButton", () => {
  it("should render DeleteButton with default props correctly", () => {
    const onClickMock = vi.fn();

    const { getByText } = renderWithProviders(
      <DeleteButton onClick={onClickMock} />
    );

    getByText("삭제하기").click();

    expect(onClickMock).toHaveBeenCalled();
  });

  it("should render DeleteButton with custom props correctly", () => {
    const onClickMock = vi.fn();

    const { getByText } = renderWithProviders(
      <DeleteButton onClick={onClickMock} label="Delete" color="red" />
    );

    getByText("Delete").click();

    expect(onClickMock).toHaveBeenCalled();
  });
});
