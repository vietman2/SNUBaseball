import { fireEvent, screen, waitFor } from "@testing-library/react";
import * as Router from "react-router-dom";

import { FeedbackWrite } from "./FeedbackWrite";
import { sampleClassification, sampleFeedbackDetail } from "@data/training";
import { sampleMembers } from "@data/user";
import * as MembersAPI from "@services/person/members";
import * as FeedbacksAPI from "@services/training/feedbacks";
import { renderWithProviders } from "@utils/test-utils";

describe("<FeedbackWrite />: create", () => {
  beforeEach(() => {
    jest.spyOn(Router, "useLocation").mockReturnValue({
      pathname: "/training/feedback/new",
      hash: "",
      search: "",
      state: null,
      key: "",
    });
    jest.spyOn(window, "alert").mockImplementation(() => {});
    jest.spyOn(Router, "useNavigate").mockReturnValue(jest.fn());
    jest.spyOn(Router, "useParams").mockReturnValue({ feedbackId: "1" });
    jest.spyOn(MembersAPI, "getMembers").mockResolvedValue(sampleMembers);
    jest
      .spyOn(FeedbacksAPI, "getCategoryOptions")
      .mockResolvedValue(sampleClassification);
  });

  it("handles api errors", async () => {
    jest.spyOn(FeedbacksAPI, "getFeedbackDetail").mockResolvedValue(null);
    jest.spyOn(MembersAPI, "getMembers").mockResolvedValue(null);
    renderWithProviders(<FeedbackWrite />);

    await waitFor(() => {
      fireEvent.click(screen.getByText("뒤로가기"));
    });
  });

  it("handles create", async () => {
    jest.spyOn(FeedbacksAPI, "createFeedback").mockResolvedValue({});
    renderWithProviders(<FeedbackWrite />);

    await waitFor(() => {
      fireEvent.click(screen.getByTestId("category-타격"));
      fireEvent.change(screen.getByTestId("player-select"), {
        target: { value: "qwer" },
      });
      fireEvent.change(screen.getByTestId("player-select"), {
        target: { value: "김유안" },
      });
      fireEvent.change(screen.getByTestId("status-select"), {
        target: { value: "진행중" },
      });
      fireEvent.change(screen.getByTestId("textinput-제목을 입력하세요"), {
        target: { value: "제목" },
      });
      fireEvent.change(screen.getByTestId("content-input"), {
        target: { value: "내용" },
      });
      fireEvent.click(screen.getByText("등록"));
    });
  });

  it("handles create api error", async () => {
    jest.spyOn(FeedbacksAPI, "createFeedback").mockResolvedValue(null);
    renderWithProviders(<FeedbackWrite />);

    await waitFor(() => {
      fireEvent.click(screen.getByText("등록"));
    });
  });
});

describe("<FeedbackWrite />: edit", () => {
  beforeEach(() => {
    jest.spyOn(Router, "useLocation").mockReturnValue({
      pathname: "/training/feedback/1/edit",
      hash: "",
      search: "",
      state: null,
      key: "",
    });
    jest.spyOn(window, "alert").mockImplementation(() => {});
    jest.spyOn(Router, "useNavigate").mockReturnValue(jest.fn());
    jest.spyOn(Router, "useParams").mockReturnValue({ feedbackId: "1" });
    jest.spyOn(MembersAPI, "getMembers").mockResolvedValue(sampleMembers);
    jest
      .spyOn(FeedbacksAPI, "getCategoryOptions")
      .mockResolvedValue(sampleClassification);
    jest
      .spyOn(FeedbacksAPI, "getFeedbackDetail")
      .mockResolvedValue({ status: 200, data: sampleFeedbackDetail });
  });

  it("handles api errors", async () => {
    jest.spyOn(FeedbacksAPI, "getFeedbackDetail").mockResolvedValue(null);
    jest.spyOn(MembersAPI, "getMembers").mockResolvedValue(null);
    renderWithProviders(<FeedbackWrite />);

    await waitFor(() => {
      fireEvent.click(screen.getByText("뒤로가기"));
    });
  });

  it("handles config error", async () => {
    jest.spyOn(Router, "useParams").mockReturnValue({});
    renderWithProviders(<FeedbackWrite />);

    await waitFor(() => {
      fireEvent.click(screen.getByText("뒤로가기"));
    });
  });

  it("handles edit", async () => {
    jest.spyOn(FeedbacksAPI, "editFeedback").mockResolvedValue({});
    renderWithProviders(<FeedbackWrite />);

    await waitFor(() => {
      fireEvent.click(screen.getByText("수정"));
    });
  });

  it("handles edit api error", async () => {
    jest.spyOn(FeedbacksAPI, "editFeedback").mockResolvedValue(null);
    renderWithProviders(<FeedbackWrite />);

    await waitFor(() => {
      fireEvent.click(screen.getByText("수정"));
    });
  });
});
