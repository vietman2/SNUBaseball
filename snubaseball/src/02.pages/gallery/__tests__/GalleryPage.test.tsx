import { GalleryPage, metadata } from "@pages/gallery";
import { sampleAlbums } from "@entities/albums";
import {
  getElementFromAsyncServerComponent,
  renderWithProviders,
} from "@test-utils/renderer";

describe("GalleryPage", () => {
  const render = async () => {
    const element = await getElementFromAsyncServerComponent(GalleryPage, {});

    return renderWithProviders(element);
  };

  beforeAll(() => {
    global.fetch = jest.fn();
    (global.fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: jest.fn().mockResolvedValue(sampleAlbums),
    });
  });

  it("should render correctly", async () => {
    const { getByText } = await render();

    expect(getByText("갤러리")).toBeInTheDocument(); // Breadcrumb
    expect(getByText(sampleAlbums[0].title)).toBeInTheDocument(); // AlbumCard
  });

  it("should handle fetch error", async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
      json: jest.fn().mockResolvedValue({ message: "Error message" }),
    });

    await expect(render()).rejects.toThrow(
      "데이터를 불러오는 중에 오류가 발생했습니다: Error message"
    );
  });

  it("should have correct metadata", () => {
    expect(metadata.title).toBe("갤러리 | 서울대 야구부");
    expect(metadata.description).toBe("");
  });
});
