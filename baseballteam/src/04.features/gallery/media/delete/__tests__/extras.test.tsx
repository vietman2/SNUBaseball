import { describe, expect, it, vi } from "vitest";
import { fireEvent, waitFor } from "@testing-library/react";

import { DeleteMediaButton } from "@features/gallery/media/delete";
import * as MediaEntity from "@entities/gallery/media";
import { renderWithProviders } from "@test-utils/renderer";

vi.mock("../api/deleteMedia", () => ({
  useDeleteMediaAPI: vi.fn().mockReturnValue({
    mutateAsync: vi.fn(),
    isPending: true,
  }),
}));

describe("DeleteMediaButton", () => {
  it("handles delete attempt when isPending = true", async () => {
    vi.spyOn(window, "alert").mockImplementation(() => {});

    const { getByTestId } = renderWithProviders(
      <DeleteMediaButton
        media={MediaEntity.sampleGalleryVideo}
        postDelete={vi.fn()}
      />
    );

    const deleteButton = getByTestId("delete-button-1");

    fireEvent.click(deleteButton);

    await waitFor(() => {
      expect(window.alert).not.toHaveBeenCalled();
    });
  });
});
