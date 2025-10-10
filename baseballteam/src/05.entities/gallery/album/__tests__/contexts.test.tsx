import { describe, expect, it } from "vitest";

import { useAlbums } from "@entities/gallery/album";
import { renderWithProviders } from "@test-utils/renderer";

const TestComponent = () => {
  const { isLoading } = useAlbums();
  return <div>{isLoading ? "Loading..." : "Loaded"}</div>;
};

describe("AlbumsContext", () => {
  it("should throw error when used outside of AlbumsProvider", () => {
    expect(() => renderWithProviders(<TestComponent />)).toThrow(
      "useAlbums must be used within a AlbumsProvider"
    );
  });
});
