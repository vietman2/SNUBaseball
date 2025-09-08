import { NotFoundPageWidget } from "@widgets/not-found";
import { renderWithProviders } from "@test-utils/renderer";

describe("NotFoundPageWidget", () => {
  it("renders correctly with default props", () => {
    const { getByText } = renderWithProviders(<NotFoundPageWidget />);

    expect(getByText("죄송합니다. 찾고 있는 페이지가 존재하지 않습니다.")).toBeInTheDocument();
    expect(getByText("홈으로 돌아가기")).toBeInTheDocument();
  });

  it("renders correctly with custom props", () => {
    const { getByText } = renderWithProviders(<NotFoundPageWidget message="Custom Not Found Message" reloadText="새로고침" href="/blog" />);

    expect(getByText("Custom Not Found Message")).toBeInTheDocument();
    expect(getByText("새로고침")).toBeInTheDocument();
  });
});
