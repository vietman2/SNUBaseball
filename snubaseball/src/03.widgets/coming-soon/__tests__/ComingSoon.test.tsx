import { ComingSoon } from "@widgets/coming-soon";
import { renderWithProviders } from "@test-utils/renderer";

describe("ComingSoon", () => {
  it("renders correctly", () => {
    const { getByText } = renderWithProviders(<ComingSoon />);
    expect(getByText("Coming Soon!")).toBeInTheDocument();
    expect(
      getByText("이 페이지는 곧 업데이트될 예정입니다.")
    ).toBeInTheDocument();
  });
});
