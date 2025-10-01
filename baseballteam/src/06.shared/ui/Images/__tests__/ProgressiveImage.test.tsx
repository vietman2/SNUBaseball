import { describe, expect, it, vi } from "vitest";
import { fireEvent } from "@testing-library/react";

import { ProgressiveImage } from "@shared/ui/Images";
import { renderWithProviders } from "@test-utils/renderer";

vi.unmock("@shared/ui/Images");

describe("ProgressiveImage", () => {
  it("renders without crashing", () => {
    const { getByAltText } = renderWithProviders(
      <ProgressiveImage src="test.jpg" alt="Test Image" />
    );

    fireEvent.load(getByAltText("Test Image"));
    expect(getByAltText("Test Image")).toBeInTheDocument();
  });

  it("shows fallback message on error", () => {
    const { getByText, getByAltText } = renderWithProviders(
      <ProgressiveImage src="invalid.jpg" alt="Invalid Image" />
    );
    const img = getByAltText("Invalid Image");
    fireEvent.error(img);
    expect(getByText("데이터를 불러오지 못했습니다")).toBeInTheDocument();
  });

  it("displays slow network badge after timeout", async () => {
    const { findByText } = renderWithProviders(
      <ProgressiveImage src="test.jpg" alt="Test Image" timeoutMs={100} />
    );
    const badge = await findByText("느린 네트워크…");
    expect(badge).toBeInTheDocument();
  });

  it("shows video icon overlay for video type", () => {
    const { getByAltText, getByRole } = renderWithProviders(
      <ProgressiveImage src="video.mp4" alt="Video" type="VIDEO" />
    );
    const img = getByAltText("Video");
    fireEvent.load(img);
    const icon = getByRole("img", { hidden: true });
    expect(icon).toBeInTheDocument();
  });
});
