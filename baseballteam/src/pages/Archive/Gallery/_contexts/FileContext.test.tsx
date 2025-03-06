import { fireEvent, screen, waitFor } from "@testing-library/react";

import { FilesProvider, useFiles } from "./FileContext";
import * as FilesAPI from "@services/archive/files";
import { renderWithProviders } from "@utils/test-utils";

const TestComponent = () => {
  const { dropFiles, removeFile, submitFiles } = useFiles();

  const fileList = [
    new File([""], "file1.txt"),
    new File([""], "file2.txt"),
    new File([""], "file3.txt"),
  ];
  const files = {
    0: fileList[0],
    1: fileList[1],
    2: fileList[2],
    length: 3,
    item: jest.fn(),
    [Symbol.iterator]: jest.fn().mockReturnValue(fileList.values()),
  };

  return (
    <div>
      <button onClick={() => dropFiles(files)}>Drop Files</button>
      <button onClick={() => dropFiles(null)}>Cancel File Drop</button>
      <button onClick={() => removeFile(fileList[0])}>Remove File</button>
      <button onClick={() => submitFiles()}>Submit Files</button>
    </div>
  );
};

describe("<FilesProvider />", () => {
  beforeEach(() => {
    jest.spyOn(window, "alert").mockImplementation(() => {});
    jest.spyOn(FilesAPI, "uploadFiles").mockImplementation((_, onProgress) => {
      onProgress(100);
      return Promise.resolve(true);
    });
  });

  it("should handle file uploading", async () => {
    renderWithProviders(
      <FilesProvider>
        <TestComponent />
      </FilesProvider>
    );

    await waitFor(() => {
      fireEvent.click(screen.getByText("Cancel File Drop"));
      fireEvent.click(screen.getByText("Drop Files"));
      fireEvent.click(screen.getByText("Remove File"));
      fireEvent.click(screen.getByText("Submit Files"));
    });
  });

  it("should handle api error", async () => {
    jest.spyOn(FilesAPI, "uploadFiles").mockResolvedValue(null);
    renderWithProviders(
      <FilesProvider>
        <TestComponent />
      </FilesProvider>
    );

    await waitFor(() => {
      fireEvent.click(screen.getByText("Submit Files"));
    });
  });

  it("should handle misuse", async () => {
    jest.spyOn(console, "error").mockImplementation(() => {});
    expect(() => renderWithProviders(<TestComponent />)).toThrow();
  });
});
