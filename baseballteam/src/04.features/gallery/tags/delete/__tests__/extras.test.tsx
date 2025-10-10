import { describe, expect, it, vi } from "vitest";
import { fireEvent, waitFor } from "@testing-library/react";

import { DeleteTagButton } from "@features/gallery/tags/delete";
import { sampleTags } from "@entities/gallery/tags";
import { renderWithProviders } from "@test-utils/renderer";

vi.mock("../api/deleteTag", () => ({
  useDeleteTagAPI: vi.fn().mockReturnValue({
    mutateAsync: vi.fn(),
    isPending: true,
  }),
}));

describe("DeleteTagButton", () => {
  it("handles delete attempt when isPending = true", async () => {
    vi.spyOn(window, "alert").mockImplementation(() => {});

    const { getByTestId } = renderWithProviders(
      <DeleteTagButton tag={sampleTags[0]} />
    );

    const deleteButton = getByTestId("delete-tag-1");

    fireEvent.click(deleteButton);

    await waitFor(() => {
      expect(window.alert).not.toHaveBeenCalled();
    });
  });
});
