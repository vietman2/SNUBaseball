import { describe, it, expect, vi } from "vitest";
import { fireEvent } from "@testing-library/react";

import {
  FileSelectProvider,
  FileDropArea,
  SelectedFiles,
  useFileSelect,
} from "@shared/lib/files";
import { renderWithProviders } from "@test-utils/renderer";

vi.unmock("@shared/lib/files");

const InnerComponent = () => {
  const { setProgress, setError, setDone, clear } = useFileSelect();

  return (
    <div>
      <button data-testid="set-progress" onClick={() => setProgress("1", 50)}>
        Set Progress
      </button>
      <button data-testid="set-error" onClick={() => setError("1", "Error")}>
        Set Error
      </button>
      <button data-testid="set-done" onClick={() => setDone("1")}>
        Set Done
      </button>
      <button data-testid="clear" onClick={() => clear()}>
        Clear
      </button>
    </div>
  );
};

const TestComponent = () => {
  return (
    <FileSelectProvider>
      <FileDropArea />
      <SelectedFiles />
      <InnerComponent />
    </FileSelectProvider>
  );
};

describe("FileSelector", () => {
  it("handles file drop correctly (large file)", () => {
    const { getByTestId, getByText } = renderWithProviders(<TestComponent />);

    const mockLargeFile = new File(
      ["a".repeat(10 * 1024 * 1024)],
      "testfile.png",
      {
        type: "image/png",
      }
    );

    expect(getByText("파일 업로드")).toBeInTheDocument();

    fireEvent.dragOver(getByTestId("drag-area"));
    expect(getByTestId("drag-area")).toHaveStyle("opacity: 0.8");

    fireEvent.drop(getByTestId("drag-area"), {
      dataTransfer: {
        files: [mockLargeFile],
      },
    });

    expect(getByText("testfile.png")).toBeInTheDocument();

    fireEvent.dragLeave(getByTestId("drag-area"));
    expect(getByTestId("drag-area")).toHaveStyle("opacity: 1");
  });

  it("handles file selection via input and remove correctly", () => {
    const { getByTestId, getByText, queryByText } = renderWithProviders(
      <TestComponent />
    );

    const mockFile = new File(["file content"], "selectedfile.jpg", {
      type: "image/jpeg",
    });

    expect(getByText("파일 업로드")).toBeInTheDocument();

    fireEvent.click(getByTestId("file-select-button"));

    fireEvent.change(getByTestId("file-input"), {
      target: { files: [mockFile] },
    });

    expect(getByText("selectedfile.jpg")).toBeInTheDocument();

    fireEvent.click(getByTestId("remove-file"));

    expect(queryByText("selectedfile.jpg")).not.toBeInTheDocument();
  });

  it("handles too many files error (Case 1: 30 + 1)", () => {
    const alertMock = vi.spyOn(window, "alert").mockImplementation(() => {});
    const { getByTestId, getByText, queryByText } = renderWithProviders(
      <TestComponent />
    );

    const mockFiles = Array.from(
      { length: 30 },
      (_, i) => new File(["content"], `file${i}.png`, { type: "image/png" })
    );
    const anotherFile = new File(["extra content"], `extra0.png`, {
      type: "image/png",
    });

    fireEvent.click(getByTestId("file-select-button"));
    fireEvent.change(getByTestId("file-input"), {
      target: { files: mockFiles },
    });
    expect(getByText("file0.png")).toBeInTheDocument();
    expect(getByText("file29.png")).toBeInTheDocument();

    fireEvent.click(getByTestId("file-select-button"));
    fireEvent.change(getByTestId("file-input"), {
      target: { files: [anotherFile] },
    });
    expect(alertMock).toHaveBeenCalledWith(
      "최대 30개까지 업로드할 수 있습니다."
    );
    expect(queryByText("extra0.png")).not.toBeInTheDocument();
  });

  it("handles too many files error (Case 2: 31 at once)", () => {
    const alertMock = vi.spyOn(window, "alert").mockImplementation(() => {});
    const { getByTestId, getByText, queryByText } = renderWithProviders(
      <TestComponent />
    );

    const tooManyFiles = Array.from(
      { length: 31 },
      (_, i) => new File(["content"], `file${i}.png`, { type: "image/png" })
    );

    fireEvent.click(getByTestId("file-select-button"));
    fireEvent.change(getByTestId("file-input"), {
      target: { files: tooManyFiles },
    });
    expect(alertMock).toHaveBeenCalledWith(
      "최대 30개까지 업로드할 수 있습니다."
    );
    expect(getByText("file0.png")).toBeInTheDocument();
    expect(getByText("file29.png")).toBeInTheDocument();
    expect(queryByText("file30.png")).not.toBeInTheDocument();
  });

  it("updates file status correctly using context methods", () => {
    const { getByTestId, getByText } = renderWithProviders(<TestComponent />);

    const mockFile = new File(["file content"], "statusfile.jpg", {
      type: "image/jpeg",
    });

    fireEvent.click(getByTestId("file-select-button"));
    fireEvent.change(getByTestId("file-input"), {
      target: { files: [mockFile] },
    });

    expect(getByText("statusfile.jpg")).toBeInTheDocument();

    // Set progress to 50%
    fireEvent.click(getByTestId("set-progress"));
    expect(getByText("Loading Spinner")).toBeInTheDocument();

    // Set error
    fireEvent.click(getByTestId("set-error"));
    expect(getByText("Error")).toBeInTheDocument();
    expect(
      getByTestId("file-item-statusfile.jpg").querySelector("button")
    ).toBeInTheDocument();

    // Set done
    fireEvent.click(getByTestId("set-done"));
    expect(getByText("check-icon")).toBeInTheDocument();

    // Clear all
    fireEvent.click(getByTestId("clear"));
    expect(getByText("파일 업로드")).toBeInTheDocument();
  });

  it("handles no files dropped gracefully", () => {
    const { getByTestId, getByText } = renderWithProviders(<TestComponent />);

    expect(getByText("파일 업로드")).toBeInTheDocument();

    fireEvent.dragOver(getByTestId("drag-area"));
    expect(getByTestId("drag-area")).toHaveStyle("opacity: 0.8");

    fireEvent.drop(getByTestId("drag-area"), {
      dataTransfer: {
        files: [],
      },
    });

    // Still shows the upload prompt
    expect(getByText("파일 업로드")).toBeInTheDocument();

    fireEvent.dragLeave(getByTestId("drag-area"));
    expect(getByTestId("drag-area")).toHaveStyle("opacity: 1");
  });

  it("handles null files from input change event", () => {
    const { getByTestId, getByText } = renderWithProviders(<TestComponent />);

    expect(getByText("파일 업로드")).toBeInTheDocument();

    fireEvent.click(getByTestId("file-select-button"));

    // Simulate null files (e.g., user cancels the file dialog)
    fireEvent.change(getByTestId("file-input"), {
      target: { files: null },
    });

    // Still shows the upload prompt
    expect(getByText("파일 업로드")).toBeInTheDocument();
  });

  it("handles duplicate file names correctly", () => {
    const { getByTestId, getAllByText } = renderWithProviders(<TestComponent />);

    const mockFile1 = new File(["content1"], "duplicate.png", {
      type: "image/png",
    });
    const mockFile2 = new File(["content2"], "duplicate.png", {
      type: "image/png",
    });

    fireEvent.click(getByTestId("file-select-button"));
    fireEvent.change(getByTestId("file-input"), {
      target: { files: [mockFile1] },
    });
    expect(getAllByText("duplicate.png")).toHaveLength(1);

    fireEvent.click(getByTestId("file-select-button"));
    fireEvent.change(getByTestId("file-input"), {
      target: { files: [mockFile2] },
    });
    expect(getAllByText("duplicate.png")).toHaveLength(1);
  });
});
