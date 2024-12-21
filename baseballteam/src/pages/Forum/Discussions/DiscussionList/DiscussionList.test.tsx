import { fireEvent, screen, waitFor } from "@testing-library/react";
import * as Router from "react-router-dom";

import { DiscussionList } from "./DiscussionList";
import { sampleDiscussions } from "@data/forum";
import * as DiscussionsAPI from "@services/board/discussions";
import { renderWithProviders } from "@utils/test-utils";

jest.mock("@fragments/Discussions", () => ({
  DiscussionCard: () => <div data-testid="DiscussionCard" />,
  DiscussionsTableHeader: () => <div data-testid="DiscussionsTableHeader" />,
  DiscussionsTableRow: () => <div data-testid="DiscussionsTableRow" />,
}));

describe("<DiscussionList />", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.spyOn(Router, "useLocation").mockReturnValue({
      pathname: "/forum/discussions",
      search: "",
      hash: "",
      state: null,
      key: "testKey",
    });
    jest
      .spyOn(DiscussionsAPI, "getDiscussions")
      .mockResolvedValue(sampleDiscussions);
  });

  it("handles bad response correctly", async () => {
    jest.spyOn(DiscussionsAPI, "getDiscussions").mockResolvedValue(null);
    await waitFor(() => renderWithProviders(<DiscussionList />));

    await waitFor(() =>
      expect(screen.getByText("새로고침")).toBeInTheDocument()
    );
    waitFor(() => fireEvent.click(screen.getByText("새로고침")));
  });

  it("handles different views correctly", async () => {
    jest.spyOn(localStorage.__proto__, "getItem").mockReturnValue("표");
    renderWithProviders(<DiscussionList />);

    await waitFor(() => {
      fireEvent.click(screen.getByText("보드"));
      fireEvent.click(screen.getByTestId("discussion-1"));
      fireEvent.click(screen.getByText("표"));
      fireEvent.click(screen.getByTestId("discussion-1"));
      fireEvent.click(screen.getByText("새 글"));
    });
  });

  it("renders in the background", async () => {
    jest.spyOn(Router, "useLocation").mockReturnValue({
      pathname: "/forum/discussions/1",
      search: "",
      hash: "",
      state: null,
      key: "testKey",
    });
    await waitFor(() => renderWithProviders(<DiscussionList />));
  });
});
