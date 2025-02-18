import { fireEvent, screen, waitFor } from "@testing-library/react";

import { Gallery } from "./Gallery";
import * as ArchiveService from "@services/archive/files";
import { renderWithProviders } from "@utils/test-utils";

describe("<Gallery />", () => {
  const mockFiles = [
    new File(["file contents"], "file.jpg", { type: "image/jpeg" }),
  ];
  const mockFiles2 = [
    new File([new Blob([new Uint8Array(10 * 1024 * 1024)])], "large-file.jpg", {
      type: "image/jpeg",
    }),
  ];

  it("handles file upload correctly", async () => {
    jest
      .spyOn(ArchiveService, "uploadFiles")
      .mockImplementation((_files, onProgress) => {
        onProgress(100);
        return Promise.resolve(true);
      });

    renderWithProviders(<Gallery />);

    fireEvent.click(screen.getByTestId("open-modal")); // Open modal
    fireEvent.dragOver(screen.getByTestId("dropzone")); // Drag over dropzone
    fireEvent.drop(screen.getByTestId("dropzone"), {
      dataTransfer: {
        files: mockFiles,
      },
    }); // Drop file
    fireEvent.dragLeave(screen.getByTestId("dropzone")); // Drag leave
    fireEvent.change(screen.getByTestId("file-input"), {
      target: {
        files: mockFiles2,
      },
    }); // Add file manually
    fireEvent.change(screen.getByTestId("file-input"), {
      target: {
        files: null,
      },
    }); // File Add Cancel

    fireEvent.click(screen.getAllByTestId("remove-file")[0]); // Remove 1 file

    await waitFor(() => {
      fireEvent.click(screen.getByText("전송 시작")); // Submit
    });
  });

  it("handles api error", async () => {
    jest.spyOn(window, "alert").mockImplementation(() => {});
    jest.spyOn(ArchiveService, "uploadFiles").mockResolvedValue(null);

    renderWithProviders(<Gallery />);

    await waitFor(() => {
      fireEvent.click(screen.getByText("전송 시작")); // Submit
    });
  });
});
