import { describe, expect, it } from "vitest";
import { fireEvent, waitFor } from "@testing-library/react";

import { NameIDInputProvider, StudentIDInput } from "@entities/members";
import { renderWithProviders } from "@test-utils/renderer";

describe("StudentIDInput", () => {
  const render = () =>
    renderWithProviders(
      <NameIDInputProvider>
        <StudentIDInput />
      </NameIDInputProvider>
    );

  it("toggles input mode when button is clicked", async () => {
    const { getByTestId, getByText, queryByTestId } = render();

    const toggleButton = getByTestId("toggle-button");
    expect(toggleButton).toBeInTheDocument();

    // 초기 상태에선, full student ID input이 보여야 함
    expect(getByTestId("student-id-input")).toBeInTheDocument();
    expect(queryByTestId("admission-year-input")).not.toBeInTheDocument();

    // 토글을 클릭하면, 연도 입력 input이 보여야 함
    fireEvent.click(toggleButton);

    await waitFor(() => {
      expect(getByTestId("admission-year-input")).toBeInTheDocument();
      expect(queryByTestId("student-id-input")).not.toBeInTheDocument();
      expect(getByText("전체 학번 입력")).toBeInTheDocument();
    });
  });
});
