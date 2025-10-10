import { describe, it, expect, vi } from "vitest";
import { fireEvent, waitFor } from "@testing-library/react";

import { DeleteMediaButton } from "@features/gallery/media/delete";
import * as MediaEntity from "@entities/gallery/media";
import * as AxiosAPI from "@shared/lib/axios";
import { renderWithProviders } from "@test-utils/renderer";

describe("DeleteMediaButton", () => {
  /* 성공 사례는 pages에서 테스트 */
  it("handles delete cancel, then delete fail", async () => {
    vi.spyOn(window, "alert").mockImplementation(() => {});
    vi.spyOn(window, "confirm").mockReturnValueOnce(false);

    const postDeleteMock = vi.fn();
    const { getByTestId } = renderWithProviders(
      <DeleteMediaButton
        media={MediaEntity.sampleGalleryVideo}
        postDelete={postDeleteMock}
      />
    );

    const deleteButton = getByTestId("delete-button-1");
    await waitFor(() => {
      expect(deleteButton).toBeInTheDocument();
    });

    // 취소 케이스
    fireEvent.click(deleteButton);

    await waitFor(() => {
      expect(window.confirm).toHaveBeenCalled();
      expect(AxiosAPI.axiosInstanceWithAuth.delete).not.toHaveBeenCalled();
      expect(postDeleteMock).not.toHaveBeenCalled();
    });

    // 실패 케이스
    vi.spyOn(window, "confirm").mockReturnValueOnce(true);
    vi.spyOn(AxiosAPI.axiosInstanceWithAuth, "delete").mockRejectedValue({});

    fireEvent.click(deleteButton);

    await waitFor(() => {
      expect(window.confirm).toHaveBeenCalled();
      expect(AxiosAPI.axiosInstanceWithAuth.delete).toHaveBeenCalled();
      expect(postDeleteMock).not.toHaveBeenCalled();
    });
  });
});
