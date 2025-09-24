import { describe, expect, it, vi } from "vitest";
import { fireEvent, waitFor } from "@testing-library/react";

import { NewAlbumForm } from "@features/gallery/createNewAlbum";
import { AlbumFormProvider } from "@entities/gallery";
import * as AxiosAPI from "@shared/lib/axios";
import { renderWithProviders } from "@test-utils/renderer";

describe("NewAlbumForm", () => {
  it("should handle form submit fail", async () => {
    const { getByTestId, getByText } = renderWithProviders(
      <AlbumFormProvider>
        <NewAlbumForm closeModal={vi.fn()} />
      </AlbumFormProvider>
    );

    vi.spyOn(AxiosAPI.axiosInstanceWithAuth, "post").mockRejectedValue({
      response: { data: { message: "error" } },
    });

    fireEvent.change(getByTestId("album-title-input"), {
      target: { value: "New Album" },
    });
    fireEvent.click(getByTestId("submit-album"));

    await waitFor(() => {
      expect(getByText("Sample Error Message")).toBeInTheDocument();
    });
  });

  // query data가 있는 상태에서의 submit은 page 테스트에서 커버
  it("should handle submit success with no album query data", async () => {
    vi.spyOn(AxiosAPI.axiosInstanceWithAuth, "post").mockResolvedValue({
      data: {
        id: 1,
        title: "New Album",
        members_only: false,
        cover_images: [],
        num_images: 0,
        num_videos: 0,
      },
    });

    const closeModalMock = vi.fn();

    const { getByTestId } = renderWithProviders(
      <AlbumFormProvider>
        <NewAlbumForm closeModal={closeModalMock} />
      </AlbumFormProvider>
    );

    fireEvent.change(getByTestId("album-title-input"), {
      target: { value: "New Album" },
    });
    fireEvent.click(getByTestId("submit-album"));

    await waitFor(() => {
      expect(closeModalMock).toHaveBeenCalled();
    });
  });
});
