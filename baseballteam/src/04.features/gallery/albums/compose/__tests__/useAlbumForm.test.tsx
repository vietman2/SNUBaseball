import { describe, expect, it } from "vitest";

import { useAlbumForm } from "../contexts/useAlbumForm";
import { renderWithProviders } from "@test-utils/renderer";

const TestComponent = () => {
  const { title } = useAlbumForm();

  return <div>{title}</div>;
};

describe("useAlbumForm", () => {
  it("throws error when used outside of provider", () => {
    expect(() => {
      renderWithProviders(<TestComponent />);
    }).toThrow("useAlbumForm must be used within a AlbumFormProvider");
  });
});
