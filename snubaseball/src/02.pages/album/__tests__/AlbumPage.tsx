import * as Router from "next/navigation";
import { fireEvent } from "@testing-library/react";

import { AlbumPage, generateMetadata } from "@pages/album";
import { sampleMediaResponse } from "@entities/albums";
import {
  getElementFromAsyncServerComponent,
  renderWithProviders,
} from "@test-utils/renderer";

describe("AlbumPage", () => {
  const render = async (params: { albumTitle: string; page?: string }) => {
    const element = await getElementFromAsyncServerComponent(AlbumPage, {
      params: Promise.resolve({ albumTitle: params.albumTitle }),
      searchParams: Promise.resolve({ page: params.page }),
    });

    return renderWithProviders(element);
  };

  beforeAll(() => {
    global.fetch = jest.fn();
    (global.fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: jest.fn().mockResolvedValue(sampleMediaResponse),
    });
    jest.spyOn(window, "open").mockImplementation(() => null);
    jest.spyOn(Router, "useSearchParams").mockImplementation(
      () =>
        ({
          get: (key: string) => {
            if (key === "page") return "1";
            return null;
          },
          toString: () => "page=1",
        } as unknown as Router.ReadonlyURLSearchParams)
    );
  });

  it("should render correctly (defaults to page 1)", async () => {
    const { getByTestId, getByText, queryByTestId } = await render({
      albumTitle: "Sample Album",
    });

    expect(getByText("갤러리")).toBeInTheDocument(); // Breadcrumb
    expect(getByText("Sample Album")).toBeInTheDocument(); // Breadcrumb last item

    // Does Not render Pagination if only 1 page
    expect(queryByTestId("page-button-prev")).not.toBeInTheDocument();
    expect(queryByTestId("page-button-next")).not.toBeInTheDocument();
    expect(queryByTestId("page-button-1")).not.toBeInTheDocument();

    // test opening media
    fireEvent.click(getByTestId("media-button-sample-image-1.jpg"));
    expect(window.open).toHaveBeenCalledWith(
      "https://example.com/sample-image-1.jpg",
      "_blank"
    );
  });

  it("should render correctly with pagination", async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: jest.fn().mockResolvedValue({
        ...sampleMediaResponse,
        count: 21,
        pages: 3,
        page: 2,
      }),
    });

    const { getByTestId, getByText } = await render({
      albumTitle: "Sample Album",
      page: "2",
    });

    expect(getByText("갤러리")).toBeInTheDocument(); // Breadcrumb
    expect(getByText("Sample Album")).toBeInTheDocument(); // Breadcrumb last item

    // Renders Pagination if more than 1 page
    expect(getByTestId("page-button-prev")).toBeInTheDocument();
    expect(getByTestId("page-button-next")).toBeInTheDocument();
    expect(getByTestId("page-button-1")).toBeInTheDocument();
    expect(getByTestId("page-button-2")).toBeInTheDocument();
    expect(getByTestId("page-button-3")).toBeInTheDocument();

    // test page change
    fireEvent.click(getByTestId("page-button-3"));
  });

  it("should handle fetch error", async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
      json: jest.fn().mockResolvedValue({ message: "Error message" }),
    });

    await expect(render({ albumTitle: "Sample Album" })).rejects.toThrow(
      "데이터를 불러오는 중에 오류가 발생했습니다: Error message"
    );
  });

  it("should have correct metadata", async () => {
    const metadata = await generateMetadata({
      params: Promise.resolve({ albumTitle: "Sample%20Album" }),
      searchParams: Promise.resolve({}),
    });

    expect(metadata.title).toBe("Sample Album | 서울대 야구부");
  });
});
