import { fireEvent, screen, waitFor } from "@testing-library/react";
import axios from "axios";

import { MediaProvider, useMedia } from "./MediaContext";
import {
  sampleImageDetail,
  sampleMedia,
  sampleMediaResponse,
  sampleVideoDetail,
} from "@data/archive";
import * as FilesAPI from "@services/archive/files";
import { renderWithProviders } from "@utils/test-utils";

const TestComponent = () => {
  const {
    selectMedia,
    reloadData,
    loadMoreData,
    deleteMedia,
    updateAlbum,
    updateTags,
    updatePerson,
  } = useMedia();

  return (
    <div>
      <button onClick={() => selectMedia(null)}>Unselect</button>
      <button onClick={() => selectMedia(sampleMedia[0])}>Select Image</button>
      <button onClick={() => selectMedia(sampleMedia[1])}>Select Video</button>
      <button onClick={() => reloadData(1, 1, 1)}>Reload Data</button>
      <button onClick={loadMoreData}>Load More Data</button>
      <button onClick={() => deleteMedia(1)}>Delete Media</button>
      <button onClick={() => updateAlbum(1, 1, "이미지")}>
        Update Image Album
      </button>
      <button onClick={() => updateTags(1, 1, "이미지")}>
        Update Image Tags
      </button>
      <button onClick={() => updatePerson(1, 1, "이미지")}>
        Update Image Person
      </button>
      <button onClick={() => updateAlbum(1, 1, "비디오")}>
        Update Video Album
      </button>
      <button onClick={() => updateTags(1, 1, "비디오")}>
        Update Video Tags
      </button>
      <button onClick={() => updatePerson(1, 1, "비디오")}>
        Update Video Person
      </button>
    </div>
  );
};

describe("<MediaProvider />", () => {
  beforeEach(() => {
    jest.spyOn(window, "alert").mockImplementation(() => {});
    jest
      .spyOn(FilesAPI, "addOrRemovePerson")
      .mockResolvedValue(sampleImageDetail);
    jest.spyOn(FilesAPI, "addOrRemoveTag").mockResolvedValue(sampleImageDetail);
    jest.spyOn(FilesAPI, "deleteMedia").mockResolvedValue(true);
    jest.spyOn(FilesAPI, "setAlbum").mockResolvedValue(sampleImageDetail);
  });

  it("should handle function calls", async () => {
    renderWithProviders(
      <MediaProvider>
        <TestComponent />
      </MediaProvider>
    );

    jest
      .spyOn(FilesAPI, "getFiles")
      .mockResolvedValue({ ...sampleMediaResponse, results: sampleMedia });
    jest
      .spyOn(FilesAPI, "getMediaDetails")
      .mockResolvedValueOnce(sampleImageDetail);
    await waitFor(() => {
      fireEvent.click(screen.getByText("Load More Data")); // No Media Response yet
      fireEvent.click(screen.getByText("Reload Data"));
      fireEvent.click(screen.getByText("Select Image"));
    });

    jest
      .spyOn(FilesAPI, "getMediaDetails")
      .mockResolvedValueOnce(sampleVideoDetail);
    await waitFor(() => {
      fireEvent.click(screen.getByText("Select Video"));
    });

    jest.spyOn(axios, "get").mockResolvedValueOnce(null);
    await waitFor(() => fireEvent.click(screen.getByText("Load More Data")));

    jest.spyOn(axios, "get").mockResolvedValueOnce({
      data: { ...sampleMediaResponse, results: sampleMedia },
    });
    await waitFor(() => {
      fireEvent.click(screen.getByText("Unselect"));
      fireEvent.click(screen.getByText("Load More Data"));
      fireEvent.click(screen.getByText("Update Image Album"));
      fireEvent.click(screen.getByText("Update Image Tags"));
      fireEvent.click(screen.getByText("Update Image Person"));
      fireEvent.click(screen.getByText("Update Video Album"));
      fireEvent.click(screen.getByText("Update Video Tags"));
      fireEvent.click(screen.getByText("Update Video Person"));
      fireEvent.click(screen.getByText("Delete Media"));
    });
  });

  it("should handle api errors", async () => {
    jest.spyOn(FilesAPI, "getMediaDetails").mockResolvedValue(null);
    jest.spyOn(FilesAPI, "deleteMedia").mockResolvedValue(false);
    jest.spyOn(FilesAPI, "getFiles").mockResolvedValue(null);
    jest.spyOn(FilesAPI, "setAlbum").mockResolvedValue(null);
    jest.spyOn(FilesAPI, "addOrRemovePerson").mockResolvedValue(null);
    jest.spyOn(FilesAPI, "addOrRemoveTag").mockResolvedValue(null);

    renderWithProviders(
      <MediaProvider>
        <TestComponent />
      </MediaProvider>
    );

    await waitFor(() => {
      fireEvent.click(screen.getByText("Reload Data"));
      fireEvent.click(screen.getByText("Select Image"));
      fireEvent.click(screen.getByText("Delete Media"));
      fireEvent.click(screen.getByText("Update Image Album"));
      fireEvent.click(screen.getByText("Update Image Tags"));
      fireEvent.click(screen.getByText("Update Image Person"));
    });
  });

  it("should handle misuse", async () => {
    jest.spyOn(console, "error").mockImplementation(() => {});
    expect(() => renderWithProviders(<TestComponent />)).toThrow();
  });
});
