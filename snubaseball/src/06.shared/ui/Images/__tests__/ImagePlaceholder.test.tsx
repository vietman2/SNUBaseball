import { ImagePlaceholder } from "@shared/ui/Images";
import { renderWithProviders } from "@test-utils/renderer";

jest.unmock("@shared/ui/Images");

describe("ImagePlaceholder", () => {
  it("renders correctly", () => {
    const { getByText } = renderWithProviders(<ImagePlaceholder />);

    expect(getByText("이미지 준비 중...")).toBeInTheDocument();
  });
});
