import { fireEvent, screen, waitFor } from "@testing-library/react";

import { InformationWrite } from "./InformationWrite";
import { sampleInformationDetail } from "@data/forum";
import * as InformationAPI from "@services/board/information";
import * as MediaAPI from "@services/media/image";
import { renderWithProviders } from "@utils/test-utils";

const mockFile = new File([""], "file.png");

jest.mock("@components/Inputs", () => {
  return {
    ContentInput: ({ uploadImage }: { uploadImage: (file: File) => void }) => (
      <button onClick={() => uploadImage(mockFile)}>ContentInput</button>
    ),
    TextInput: () => <div>TextInput</div>,
  };
});
jest.spyOn(window, "alert").mockImplementation(() => {});

describe("<InformationWrite />", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest
      .spyOn(InformationAPI, "getInformationDetails")
      .mockResolvedValue({ status: 200, data: sampleInformationDetail });
  });

  it("handles bad response correctly", async () => {
    jest.spyOn(InformationAPI, "getInformationDetails").mockResolvedValue(null);

    await waitFor(() =>
      renderWithProviders(
        <InformationWrite
          informationId={1}
          editMode={true}
          goBack={jest.fn()}
        />
      )
    );

    await waitFor(() =>
      expect(screen.getByText("뒤로가기")).toBeInTheDocument()
    );
  });

  it("handles bad config correctly", async () => {
    jest.spyOn(InformationAPI, "getInformationDetails").mockResolvedValue(null);

    await waitFor(() =>
      renderWithProviders(
        <InformationWrite
          informationId={null}
          editMode={true}
          goBack={jest.fn()}
        />
      )
    );
  });

  it("handles image upload correctly", async () => {
    jest
      .spyOn(MediaAPI, "uploadImage")
      .mockResolvedValue({ status: 200, data: "" });

    await waitFor(() =>
      renderWithProviders(
        <InformationWrite
          informationId={1}
          editMode={false}
          goBack={jest.fn()}
        />
      )
    );

    fireEvent.click(screen.getByText("ContentInput"));
  });

  it("handles image upload fail", async () => {
    jest.spyOn(MediaAPI, "uploadImage").mockResolvedValue(null);

    await waitFor(() =>
      renderWithProviders(
        <InformationWrite
          informationId={1}
          editMode={false}
          goBack={jest.fn()}
        />
      )
    );

    fireEvent.click(screen.getByText("ContentInput"));
  });

  it("handles create information correctly with file upload", async () => {
    jest.spyOn(InformationAPI, "createInformation").mockResolvedValue({
      status: 201,
      data: {},
    });

    await waitFor(() =>
      renderWithProviders(
        <InformationWrite
          informationId={null}
          editMode={false}
          goBack={jest.fn()}
        />
      )
    );

    await waitFor(() =>
      expect(screen.getByText("파일 첨부")).toBeInTheDocument()
    );
    fireEvent.click(screen.getByText("파일 첨부"));

    const file = new File(["dummy content"], "example.pdf", {
      type: "application/pdf",
    });
    await waitFor(() =>
      fireEvent.change(screen.getByTestId("file-upload"), {
        target: { files: [file] },
      })
    );

    fireEvent.click(screen.getByTestId("toggle"));
    fireEvent.click(screen.getByTestId("toggle"));

    await waitFor(() => fireEvent.click(screen.getByText("등록")));
  });

  it("handles file upload cancel", async () => {
    waitFor(() =>
      renderWithProviders(
        <InformationWrite
          informationId={1}
          editMode={false}
          goBack={jest.fn()}
        />
      )
    );

    await waitFor(() =>
      expect(screen.getByText("파일 첨부")).toBeInTheDocument()
    );
    fireEvent.click(screen.getByText("파일 첨부"));

    await waitFor(() =>
      fireEvent.change(screen.getByTestId("file-upload"), {
        target: { files: null },
      })
    );
  });

  it("handles create notice fail", async () => {
    jest.spyOn(InformationAPI, "createInformation").mockResolvedValue(null);

    waitFor(() =>
      renderWithProviders(
        <InformationWrite
          informationId={null}
          editMode={false}
          goBack={jest.fn()}
        />
      )
    );

    await waitFor(() => fireEvent.click(screen.getByText("등록")));
  });

  it("handles edit mode correctly", async () => {
    jest.spyOn(InformationAPI, "updateInformation").mockResolvedValue({
      status: 200,
      data: sampleInformationDetail,
    });

    waitFor(() =>
      renderWithProviders(
        <InformationWrite
          informationId={1}
          editMode={true}
          goBack={jest.fn()}
        />
      )
    );

    await waitFor(() => expect(screen.getByText("등록")).toBeInTheDocument());

    fireEvent.click(screen.getByText("등록"));
  });

  it("handles edit mode fail", async () => {
    jest.spyOn(InformationAPI, "updateInformation").mockResolvedValue(null);

    waitFor(() =>
      renderWithProviders(
        <InformationWrite
          informationId={1}
          editMode={true}
          goBack={jest.fn()}
        />
      )
    );

    await waitFor(() => expect(screen.getByText("등록")).toBeInTheDocument());

    fireEvent.click(screen.getByText("등록"));
  });
});
