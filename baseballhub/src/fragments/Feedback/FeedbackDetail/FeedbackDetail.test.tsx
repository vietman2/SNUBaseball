import { waitFor } from "@testing-library/react";

import { FeedbackDetail } from "./FeedbackDetail";
import { sampleFeedbackDetail } from "@data/notes";
import * as FeedbackAPI from "@services/notes/feedbacks";
import { renderWithProviders } from "@utils/test-utils";

describe("<FeedbackDetail />", () => {
  it("handles null feedbackId correctly", async () => {
    renderWithProviders(
      <FeedbackDetail feedbackId={null} goBack={jest.fn()} />
    );
  });

  it("handles bad response correctly", async () => {
    jest.spyOn(FeedbackAPI, "getFeedbackDetail").mockResolvedValue(null);
    waitFor(() =>
      renderWithProviders(<FeedbackDetail feedbackId={1} goBack={jest.fn()} />)
    );
  });

  it("renders new correctly", async () => {
    jest.spyOn(FeedbackAPI, "getFeedbackDetail").mockResolvedValue({
      status: 200,
      data: sampleFeedbackDetail,
    });
    await waitFor(() =>
      renderWithProviders(<FeedbackDetail feedbackId={1} goBack={jest.fn()} />)
    );
  });

  it("renders in progress correctly", async () => {
    jest.spyOn(FeedbackAPI, "getFeedbackDetail").mockResolvedValue({
      status: 200,
      data: {...sampleFeedbackDetail, status: "진행중"},
    });
    await waitFor(() =>
      renderWithProviders(<FeedbackDetail feedbackId={1} goBack={jest.fn()} />)
    );
  });

  it("renders under review correctly", async () => {
    jest.spyOn(FeedbackAPI, "getFeedbackDetail").mockResolvedValue({
      status: 200,
      data: {...sampleFeedbackDetail, status: "검토중"},
    });
    await waitFor(() =>
      renderWithProviders(<FeedbackDetail feedbackId={1} goBack={jest.fn()} />)
    );
  });

  it("renders done correctly", async () => {
    jest.spyOn(FeedbackAPI, "getFeedbackDetail").mockResolvedValue({
      status: 200,
      data: {...sampleFeedbackDetail, status: "완료"},
    });
    await waitFor(() =>
      renderWithProviders(<FeedbackDetail feedbackId={1} goBack={jest.fn()} />)
    );
  });
});
