import { fireEvent, screen, waitFor } from "@testing-library/react";
import * as Router from "react-router-dom";

import { GuidelineList } from "./GuidelineList";
import { sampleGuidelines } from "@data/training";
import * as GuidelinesAPI from "@services/training/guidelines";
import { renderWithProviders } from "@utils/test-utils";

jest.mock("@fragments/Guideline", () => ({
  GuidelineSimple: () => <div data-testid="GuidelineSimple" />,
}));

describe("<GuidelineList />", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.spyOn(Router, "useNavigate").mockReturnValue(jest.fn());
    jest.spyOn(Router, "useLocation").mockReturnValue({
      pathname: "/training/guidelines",
      hash: "",
      search: "",
      state: "",
      key: "",
    });
    jest
      .spyOn(GuidelinesAPI, "getGuidelines")
      .mockResolvedValue(sampleGuidelines);
  });

  it("should handle bad response", async () => {
    jest.spyOn(GuidelinesAPI, "getGuidelines").mockResolvedValue(null);
    renderWithProviders(<GuidelineList />);

    await waitFor(() => fireEvent.click(screen.getByText("새로고침")));
  });

  it("handles filters and navigate correctly", async () => {
    renderWithProviders(<GuidelineList />);

    await waitFor(() => {
      fireEvent.click(screen.getByTestId("all"));
      fireEvent.click(screen.getByTestId("drill"));
      fireEvent.click(screen.getByTestId("example"));
      fireEvent.click(screen.getByTestId("guideline-1"));
      fireEvent.click(screen.getByTestId("create-button"));
    });
  });
});
