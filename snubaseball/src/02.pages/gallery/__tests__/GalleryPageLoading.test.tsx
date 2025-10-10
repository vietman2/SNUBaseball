import { GalleryPageLoading } from "@pages/gallery";
import { renderWithProviders } from "@test-utils/renderer";

describe("GalleryPageLoading", () => {
  it("should render loading skeletons", () => {
    const { getAllByTestId, getByText } = renderWithProviders(
      <GalleryPageLoading />
    );

    const skeletons = getAllByTestId("skeleton");

    expect(skeletons.length).toBe(14); // 7 앨범 카드, 각 앨범 카드에 2개의 스켈레톤
    expect(getByText("갤러리")).toBeInTheDocument();
  });
});
