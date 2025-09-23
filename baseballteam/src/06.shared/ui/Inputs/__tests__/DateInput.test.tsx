import { describe, expect, it, vi } from "vitest";
import { fireEvent } from "@testing-library/react";

import { DateInput } from "@shared/ui/Inputs";
import { renderWithProviders } from "@test-utils/renderer";

vi.unmock("@shared/ui/Inputs");

describe("DateInput", () => {
  it("displays correct values", () => {
    const { getByTestId, rerender } = renderWithProviders(
      <DateInput value={null} onChange={() => {}} data-testid="date-input" />
    );

    const dateInput = getByTestId("date-input") as HTMLInputElement;

    // 초기: null → 빈 문자열
    expect(dateInput.value).toBe("");

    // 케이스들을 순차 rerender 하며 한 it 안에서 점검
    const seq: Array<{ in: string | null; out: string; note?: string }> = [
      { in: "2025-01-03", out: "2025-01-03", note: "ISO 그대로" },
      { in: "  2025-01-03  ", out: "2025-01-03", note: "앞뒤 공백 trim" },
      { in: "20250103", out: "2025-01-03", note: "digits → ISO" },
      { in: "2025/01/03", out: "2025-01-03", note: "슬래시 포함 → ISO" },
      { in: "2025.01.03", out: "2025-01-03", note: "점 포함 → ISO" },
      { in: "20251330", out: "", note: "유효하지 않은 날짜 (month) → 빈 값" },
      { in: "20250230", out: "", note: "유효하지 않은 날짜 (day) → 빈 값" },
      { in: "hello world", out: "", note: "비-ISO 문자열 → 빈 값" },
      { in: null, out: "", note: "null → 빈 값" },
    ];

    for (const { in: value, out } of seq) {
      rerender(
        <DateInput value={value} onChange={() => {}} data-testid="date-input" />
      );
      expect(dateInput.value).toBe(out);
    }
  });

  it("handles onChange and props", async () => {
    const onChange = vi.fn();
    const { getByTestId, rerender } = renderWithProviders(
      <DateInput
        value={null}
        onChange={onChange}
        name="birth"
        placeholder="YYYY-MM-DD"
        data-testid="date-input"
      />
    );

    const dateInput = getByTestId("date-input") as HTMLInputElement;

    // props 전달 확인 (type은 항상 date)
    expect(dateInput).toHaveAttribute("name", "birth");
    expect(dateInput).toHaveAttribute("placeholder", "YYYY-MM-DD");
    expect(dateInput).toHaveAttribute("type", "date");

    // 날짜 선택 → ISO로 콜백
    fireEvent.change(dateInput, { target: { value: "2024-02-29" } });
    expect(onChange).toHaveBeenLastCalledWith("2024-02-29");

    rerender(
      <DateInput
        value={"2024-02-29"}
        onChange={onChange}
        data-testid="date-input"
      />
    );

    // 모두 지움 → null로 콜백
    fireEvent.change(dateInput, { target: { value: "" } });
    expect(onChange).toHaveBeenLastCalledWith(null);
  });
});
