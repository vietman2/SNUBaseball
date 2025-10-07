import { describe, expect, it, vi } from "vitest";
import { waitFor } from "@testing-library/react";

import { GalleryAdminLayout } from "../layout";
import * as RouterAPI from "@shared/lib/router";
import { renderWithProviders } from "@test-utils/renderer";

describe("GalleryAdminLayout", () => {
  it("should render albums page", async () => {
    vi.spyOn(RouterAPI, "useRouter").mockReturnValue({
      backgroundLocation: {
        pathname: "/gallery",
        search: "",
        hash: "",
        state: null,
        key: "default",
      },
      displayLocation: {
        pathname: "/gallery/admin/albums",
        search: "",
        hash: "",
        state: null,
        key: "default",
      },
      isModal: false,
    });
    const { getByText } = renderWithProviders(<GalleryAdminLayout />);

    await waitFor(() => {
      expect(getByText("앨범 관리")).toHaveProperty("className", expect.stringContaining("active"));
    });
  });

  it("should render tags page", async () => {
    vi.spyOn(RouterAPI, "useRouter").mockReturnValue({
      backgroundLocation: {
        pathname: "/gallery",
        search: "",
        hash: "",
        state: null,
        key: "default",
      },
      displayLocation: {
        pathname: "/gallery/admin/tags",
        search: "",
        hash: "",
        state: null,
        key: "default",
      },
      isModal: false,
    });
    const { getByText } = renderWithProviders(<GalleryAdminLayout />);

    await waitFor(() => {
      expect(getByText("태그 관리")).toHaveProperty(
        "className",
        expect.stringContaining("active")
      );
    });
  });
});
