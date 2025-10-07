import { describe, expect, it, vi } from "vitest";
import { fireEvent, waitFor } from "@testing-library/react";

import { DeleteAlbumButton } from "@features/gallery/albums/delete";
import { sampleAlbums } from "@entities/gallery/album";
import { renderWithProviders } from "@test-utils/renderer";

vi.mock("../api/deleteAlbum", () => ({
  useDeleteAlbumAPI: vi.fn().mockReturnValue({
    mutateAsync: vi.fn(),
    isPending: true,
  }),
}));

describe("DeleteAlbumButton", () => {
  it("handles delete attempt when isPending = true", async () => {
    vi.spyOn(window, "alert").mockImplementation(() => {});

    const { getByTestId } = renderWithProviders(
      <DeleteAlbumButton album={sampleAlbums[0]} />
    );

    const deleteButton = getByTestId("delete-button-1");

    fireEvent.click(deleteButton);

    await waitFor(() => {
      expect(window.alert).not.toHaveBeenCalled();
    });
  });
});
