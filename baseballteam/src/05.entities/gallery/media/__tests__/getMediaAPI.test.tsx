import { beforeEach, describe, expect, it, vi } from "vitest";

import { useMediaAPI } from "@entities/gallery/media";
import * as AxiosAPI from "@shared/lib/axios";
import { renderWithProviders } from "@test-utils/renderer";

const TestComponent = () => {
  const { data } = useMediaAPI();

  return <div>{JSON.stringify(data)}</div>;
};

describe("useMediaAPI corner-cases", () => {
  beforeEach(() => {
    vi.spyOn(AxiosAPI.axiosInstanceWithAuth, "get").mockResolvedValue({
      data: {
        count: 0,
        pages: 0,
        page: 0,
        page_size: 0,
        results: [],
      },
    });
  });

  it("handle empty params", async () => {
    const { findByText } = renderWithProviders(<TestComponent />);

    expect(
      await findByText(
        '{"count":0,"pages":0,"page":0,"page_size":0,"results":[]}'
      )
    ).toBeDefined();
  });
});
