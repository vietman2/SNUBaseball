import { fireEvent } from "@testing-library/react";

import { RootHeader } from "@widgets/header";
import { renderWithProviders } from "@test-utils/renderer";

describe("RootHeader", () => {
  it("should render and handle tab clicks correctly", () => {
    const { getByTestId, getByText } = renderWithProviders(<RootHeader />);

    expect(getByText("logo-48")).toBeInTheDocument();

    fireEvent.click(getByTestId("tab-갤러리")); // Tab Click 테스트
    fireEvent.click(getByTestId("tab-문의")); // Tab With Subtabs Click 테스트
    fireEvent.click(getByTestId("subtab-팀 소개")); // Subtab Click 테스트
  });
});
