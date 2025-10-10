import { GalleryLayout } from "@app/gallery";
import { renderWithProviders } from "@test-utils/renderer";

describe("GalleryLayout", () => {
  it("should render correctly", async () => {
    const { getByText } = renderWithProviders(
      <GalleryLayout>
        <div>Test Content</div>
      </GalleryLayout>
    );

    expect(getByText("서울대 야구부 갤러리")).toBeInTheDocument();
    expect(getByText("Test Content")).toBeInTheDocument();
  });
});
