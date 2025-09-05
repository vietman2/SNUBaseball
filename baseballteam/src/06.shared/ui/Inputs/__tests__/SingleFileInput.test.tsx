import { describe, expect, it, vi } from "vitest";
import { fireEvent } from "@testing-library/react";

import { SingleFileInput } from "@shared/ui/Inputs";
import { renderWithProviders } from "@test-utils/renderer";

describe("SingleFileInput", () => {
  const file = new File(["dummy content"], "example.png", {
    type: "image/png",
  });

  it("handles disabled correctly", () => {
    const { getByTestId } = renderWithProviders(
      <SingleFileInput
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

  it("handles preview url and reset correctly", () => {
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
      <SingleFileInput
        value={file}
        onChange={handleChange}
        defaultPreviewUrl="/image/preview.jpg"
        onError={vi.fn()}
      />
    );

    expect(getByTestId("preview-image")).toBeInTheDocument();

    // Simulate reset
    const resetButton = getByTestId("reset-button");
    fireEvent.click(resetButton);

    expect(handleChange).toHaveBeenCalledWith(null);
  });

  it("handles drag and drop correctly", () => {
    const handleChange = vi.fn();
    const { getByTestId } = renderWithProviders(
      <SingleFileInput value={null} onChange={handleChange} onError={vi.fn()} />
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

  it("does nothing when no file is dropped", () => {
    const handleChange = vi.fn();
    const { getByTestId } = renderWithProviders(
      <SingleFileInput value={null} onChange={handleChange} onError={vi.fn()} />
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
      <SingleFileInput
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

  it("sets error correctly when file exceeds max size", () => {
    const handleError = vi.fn();
    const { getByTestId } = renderWithProviders(
      <SingleFileInput
        value={null}
        onChange={vi.fn()}
        onError={handleError}
        maxSizeMB={0.001}
      />
    );

    const dropArea = getByTestId("drop-area");
    const bigBlob = new Blob([new Uint8Array(2 * 1024)]);
    const bigFile = new File([bigBlob], "example1.png", { type: "image/png" });

    fireEvent.drop(dropArea, {
      dataTransfer: {
        files: [bigFile],
      },
    });

    expect(handleError).toHaveBeenCalledWith(
      "파일 크기는 최대 0.001MB까지 허용됩니다."
    );
  });

  it("handles click correctly", () => {
    const handleChange = vi.fn();
    const { getByTestId } = renderWithProviders(
      <SingleFileInput value={null} onChange={handleChange} onError={vi.fn()} />
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

  it("sets error correctly when file type is not accepted (click to upload)", () => {
    const handleError = vi.fn();
    const { getByTestId } = renderWithProviders(
      <SingleFileInput
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
});
