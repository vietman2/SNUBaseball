import { describe, expect, it, vi } from "vitest";
import { fireEvent } from "@testing-library/react";

import { SingleFileDropArea } from "@shared/lib/files";
import { renderWithProviders } from "@test-utils/renderer";

vi.unmock("@shared/lib/files");

describe("SingleFileDropArea", () => {
  const file = new File(["dummy content"], "example.png", {
    type: "image/png",
  });

  it("handles drag and drop correctly", () => {
    const handleChange = vi.fn();
    const { getByTestId } = renderWithProviders(
      <SingleFileDropArea
        value={null}
        onChange={handleChange}
        onError={vi.fn()}
      />
    );

    const dropArea = getByTestId("drop-area");

    // Simulate drag over
    fireEvent.dragOver(dropArea);

    // Simulate drop with a valid file
    fireEvent.drop(dropArea, {
      dataTransfer: {
        files: [file],
      },
    });

    expect(handleChange).toHaveBeenCalledWith(file);

    fireEvent.dragLeave(dropArea);
  });

  it("handles click and reset correctly", () => {
    const handleChange = vi.fn();
    const { getByTestId } = renderWithProviders(
      <SingleFileDropArea
        value={null}
        onChange={handleChange}
        onError={vi.fn()}
      />
    );

    const dropArea = getByTestId("drop-area");
    const file = new File(["dummy content"], "example.png", {
      type: "image/png",
    });

    fireEvent.click(dropArea, {
      dataTransfer: {
        files: [file],
      },
    });
    fireEvent.change(getByTestId("file-input"), {
      target: { files: [file] },
    });

    expect(handleChange).toHaveBeenCalledWith(file);
  });

  it("does nothing when no file is dropped", () => {
    const handleChange = vi.fn();
    const { getByTestId } = renderWithProviders(
      <SingleFileDropArea
        value={null}
        onChange={handleChange}
        onError={vi.fn()}
      />
    );

    const dropArea = getByTestId("drop-area");

    // Simulate drop with no files
    fireEvent.drop(dropArea, {
      dataTransfer: {
        files: [],
      },
    });

    expect(handleChange).not.toHaveBeenCalled();
  });

  it("sets error correctly when multiple files are dropped", () => {
    const handleChange = vi.fn();
    const handleError = vi.fn();
    const { getByTestId } = renderWithProviders(
      <SingleFileDropArea
        value={null}
        onChange={handleChange}
        onError={handleError}
      />
    );

    const dropArea = getByTestId("drop-area");

    const file2 = new File(["dummy content"], "example2.png", {
      type: "image/png",
    });

    fireEvent.drop(dropArea, {
      dataTransfer: {
        files: [file, file2],
      },
    });

    expect(handleError).toHaveBeenCalledWith(
      "한 번에 하나의 파일만 업로드할 수 있어요."
    );
  });

  it("handles disabled correctly", () => {
    const { getByTestId } = renderWithProviders(
      <SingleFileDropArea
        value={null}
        onChange={vi.fn()}
        onError={vi.fn()}
        disabled
      />
    );

    // test drop when disabled
    const dropArea = getByTestId("drop-area");
    fireEvent.dragOver(dropArea);
    fireEvent.drop(dropArea, {
      dataTransfer: {
        files: [file],
      },
    });

    fireEvent.dragLeave(dropArea);

    // test click when disabled
    fireEvent.click(dropArea);

    expect(getByTestId("file-input")).toBeDisabled();
  });

  it("sets error correctly when file type is not accepted (click to upload)", () => {
    const handleError = vi.fn();
    const { getByTestId } = renderWithProviders(
      <SingleFileDropArea
        value={null}
        onChange={vi.fn()}
        onError={handleError}
        accept="image/*"
      />
    );

    const dropArea = getByTestId("drop-area");
    const file = new File(["dummy content"], "example.pdf", {
      type: "application/pdf",
    });

    fireEvent.click(dropArea, {
      dataTransfer: {
        files: [file],
      },
    });
    fireEvent.change(getByTestId("file-input"), {
      target: { files: [file] },
    });

    expect(handleError).toHaveBeenCalledWith("허용되지 않는 파일 형식입니다.");
  });

  it("handles reset correctly", () => {
    // mock URL.createObjectURL
    Object.defineProperty(global.URL, "createObjectURL", {
      writable: true,
      value: vi.fn().mockReturnValue("/image/preview.png"),
    });
    Object.defineProperty(global.URL, "revokeObjectURL", {
      writable: true,
      value: vi.fn(),
    });
    const handleChange = vi.fn();
    const { getByTestId } = renderWithProviders(
      <SingleFileDropArea
        value={file}
        onChange={handleChange}
        onError={vi.fn()}
      />
    );

    // Simulate reset
    fireEvent.click(getByTestId("reset-button"));
    expect(handleChange).toHaveBeenCalledWith(null);
  });
});
