import { describe, it } from "vitest";

import { ErrorWidget } from "@widgets/error";
import { renderWithProviders } from "@test-utils/renderer";

describe("ErrorWidget", () => {
  it("renders correctly with default message", () => {
    const { getByText } = renderWithProviders(
      <ErrorWidget>
        <button>Retry</button>
      </ErrorWidget>
    );
    getByText("오류가 발생했습니다.");
    getByText("Retry");
  });

  it("renders correctly with custom message", () => {
    const { getByText } = renderWithProviders(
      <ErrorWidget message="Custom error occurred">
        <button>Retry</button>
      </ErrorWidget>
    );
    getByText("Custom error occurred");
    getByText("Retry");
  });
});
