import { describe, expect, it } from "vitest";
import { fireEvent } from "@testing-library/react";

import { NotFoundWidget } from "@widgets/not-found";
import { renderWithProviders } from "@test-utils/renderer";

describe("NotFoundWidget", () => {
  it("renders correctly", () => {
    const { getByText } = renderWithProviders(<NotFoundWidget />);

    expect(getByText("존재하지 않는 페이지입니다.")).toBeInTheDocument();

    fireEvent.click(getByText("뒤로가기"));
  });

  it("renders with custom label and path", () => {
    const { getByText } = renderWithProviders(
      <NotFoundWidget label="커스텀으로 가기" path="/custom-path" />
    );

    expect(getByText("존재하지 않는 페이지입니다.")).toBeInTheDocument();

    fireEvent.click(getByText("커스텀으로 가기"));
  });
});
