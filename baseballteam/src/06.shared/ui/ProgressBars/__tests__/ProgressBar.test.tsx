import { describe, expect, it, vi } from "vitest";

import { ProgressBar } from "@shared/ui/ProgressBars";
import { renderWithProviders } from "@test-utils/renderer";

vi.unmock("@shared/ui/ProgressBars");

describe("ProgressBar", () => {
  it("renders with 0% progress", () => {
    const { getByTestId } = renderWithProviders(
      <ProgressBar $progress={0} data-testid="progress-bar" />
    );
    const progressBar = getByTestId("progress-bar");
    expect(progressBar).toBeInTheDocument();
    expect(progressBar).toHaveStyle("width: 100%");
    expect(progressBar).toHaveStyle("height: 8px");
  });

  it("renders with 50% progress", () => {
    const { getByTestId } = renderWithProviders(
      <ProgressBar $progress={50} data-testid="progress-bar" />
    );
    const progressBar = getByTestId("progress-bar");
    expect(progressBar).toBeInTheDocument();
    expect(progressBar).toHaveStyle("width: 100%");
    expect(progressBar).toHaveStyle("height: 8px");
  });

  it("renders with 100% progress", () => {
    const { getByTestId } = renderWithProviders(
      <ProgressBar $progress={100} data-testid="progress-bar" />
    );
    const progressBar = getByTestId("progress-bar");
    expect(progressBar).toBeInTheDocument();
    expect(progressBar).toHaveStyle("width: 100%");
    expect(progressBar).toHaveStyle("height: 8px");
  });
});
