import { fireEvent, screen, waitFor } from "@testing-library/react";
import * as Router from "react-router-dom";

import { DiscussionWrite } from "./DiscussionWrite";
import { sampleDiscussionDetail } from "@data/forum";
import * as DiscussionsAPI from "@services/board/discussions";
import { renderWithProviders } from "@utils/test-utils";

describe("<DiscussionWrite />: create", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.spyOn(window, "alert").mockImplementation(() => {});
    jest.spyOn(Router, "useParams").mockReturnValue({});
    jest.spyOn(Router, "useLocation").mockReturnValue({
      pathname: "/forum/discussions/1/",
      search: "",
      hash: "",
      state: null,
      key: "testKey",
    });
  });

  it("handles uploads cancel", async () => {
    renderWithProviders(<DiscussionWrite />);

    await waitFor(() => expect(screen.getByText("등록")).toBeInTheDocument());
    fireEvent.click(screen.getByText("파일 첨부"));

    await waitFor(() =>
      fireEvent.change(screen.getByTestId("file-upload"), {
        target: { files: null },
      })
    );
  });

  it("handles uploads and create", async () => {
    jest.spyOn(DiscussionsAPI, "createDiscussion").mockResolvedValue({
      status: 201,
      data: {},
    });

    renderWithProviders(<DiscussionWrite />);

    await waitFor(() => expect(screen.getByText("등록")).toBeInTheDocument());
    fireEvent.click(screen.getByText("파일 첨부"));

    const file = new File(["file content"], "file.pdf", {
      type: "application/pdf",
    });
    await waitFor(() => {
      fireEvent.change(screen.getByTestId("file-upload"), {
        target: { files: [file] },
      });
      fireEvent.change(screen.getByTestId("content-input"), {
        target: { value: "content" },
      });
      fireEvent.click(screen.getByTestId("remove-attachment"));
    });

    await waitFor(() => fireEvent.click(screen.getByText("등록")));
  });

  it("handles create fail", async () => {
    jest.spyOn(DiscussionsAPI, "createDiscussion").mockResolvedValue(null);

    renderWithProviders(<DiscussionWrite />);

    await waitFor(() => fireEvent.click(screen.getByText("등록")));
  });
});

describe("<DiscussionWrite />: edit", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.spyOn(window, "alert").mockImplementation(() => {});
    jest.spyOn(Router, "useParams").mockReturnValue({ discussionId: "1" });
    jest.spyOn(Router, "useLocation").mockReturnValue({
      pathname: "/forum/discussions/1/edit",
      search: "",
      hash: "",
      state: null,
      key: "testKey",
    });
    jest
      .spyOn(DiscussionsAPI, "getDiscussionDetails")
      .mockResolvedValue(sampleDiscussionDetail);
  });

  it("handles fetch fail", async () => {
    jest.spyOn(DiscussionsAPI, "getDiscussionDetails").mockResolvedValue(null);

    renderWithProviders(<DiscussionWrite />);

    await waitFor(() =>
      expect(screen.getByText("뒤로가기")).toBeInTheDocument()
    );
  });

  it("handles update", async () => {
    jest.spyOn(DiscussionsAPI, "updateDiscussion").mockResolvedValue({});

    renderWithProviders(<DiscussionWrite />);

    const file = new File(["file content"], "file.pdf", {
      type: "application/pdf",
    });

    await waitFor(() => {
      fireEvent.click(screen.getByText("파일 첨부"));
      fireEvent.change(screen.getByTestId("file-upload"), {
        target: { files: [file] },
      });
      fireEvent.click(screen.getByText("등록"));
    });
  });

  it("handles config error", async () => {
    jest.spyOn(Router, "useParams").mockReturnValue({});

    renderWithProviders(<DiscussionWrite />);

    await waitFor(() =>
      expect(screen.getByText("뒤로가기")).toBeInTheDocument()
    );
  });

  it("handles edit fail", async () => {
    jest.spyOn(DiscussionsAPI, "updateDiscussion").mockResolvedValue(null);

    renderWithProviders(<DiscussionWrite />);

    await waitFor(() => fireEvent.click(screen.getByText("등록")));
  });
});
