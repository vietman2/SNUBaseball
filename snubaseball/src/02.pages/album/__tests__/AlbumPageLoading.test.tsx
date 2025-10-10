import { AlbumPageLoading } from "@pages/album";
import { renderWithProviders } from "@test-utils/renderer";

describe("AlbumPageLoading", () => {
  it("should render correctly", () => {
    const { getAllByTestId, getByText } = renderWithProviders(
      <AlbumPageLoading />
    );

    const skeletons = getAllByTestId("skeleton");

    expect(skeletons.length).toBe(7); // 7 앨범 카드 스켈레톤
    expect(getByText("앨범")).toBeInTheDocument();
  });
});
