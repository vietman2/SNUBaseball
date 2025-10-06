import { describe, it, expect, vi } from "vitest";
import { fireEvent } from "@testing-library/react";

import { ColorPicker } from "@shared/ui/Pickers";
import { renderWithProviders } from "@test-utils/renderer";

vi.unmock("@shared/ui/Pickers");

describe("ColorPicker", () => {
  it("renders ColorPicker component", async () => {
    const { getByTestId, getByText } = renderWithProviders(
      <ColorPicker color="#ffffff" onChange={vi.fn()} />
    );

    expect(getByTestId("color-picker-display")).toBeInTheDocument();

    fireEvent.click(getByTestId("color-picker-display"));

    expect(getByText("ColorPicker")).toBeInTheDocument();

    // 메뉴 내부 클릭 테스트
    fireEvent.pointerDown(getByText("ColorPicker"));

    // Escape로 메뉴 닫기 테스트
    fireEvent.keyDown(document, { key: "Escape", code: "Escape" });

    // 메뉴 다시 열기
    fireEvent.click(getByTestId("color-picker-display"));

    // Escape 외 키로는 메뉴 닫히지 않음 테스트
    fireEvent.keyDown(document, { key: "ArrowDown", code: "ArrowDown" });

    // 메뉴 외부 클릭으로 메뉴 닫기 테스트
    fireEvent.pointerDown(document);
  });
});
