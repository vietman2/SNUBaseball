import { fireEvent, screen, waitFor } from "@testing-library/react";
import * as Router from "react-router-dom";

import { ResultsDetail } from "./ResultsDetail";
import { sampleGame } from "@data/records";
import * as ResultsAPI from "@services/records/results";
import { renderWithProviders } from "@utils/test-utils";

jest.mock("@fragments/Results", () => ({
  GameEntry: () => <div>GameEntry</div>,
}));

describe("<ResultsDetail />", () => {
  beforeEach(() => {
    jest.spyOn(Router, "useParams").mockReturnValue({ gameId: "1" });
  });

  it("should handle bad response", async () => {
    jest.spyOn(ResultsAPI, "getResultsDetail").mockResolvedValue(null);
    renderWithProviders(<ResultsDetail />);

    await waitFor(() => {
      fireEvent.click(screen.getByText("뒤로가기"));
    });
  });

  it("should render", async () => {
    jest.spyOn(ResultsAPI, "getResultsDetail").mockResolvedValue(sampleGame);
    renderWithProviders(<ResultsDetail />);

    await waitFor(() => {
      expect(screen.getByText("IFrame")).toBeInTheDocument();
    });
  });

  it("should render without video", async () => {
    jest
      .spyOn(ResultsAPI, "getResultsDetail")
      .mockResolvedValue({ ...sampleGame, youtube_videoid: "" });
    renderWithProviders(<ResultsDetail />);

    await waitFor(() => {
      expect(screen.getByText("Tabs")).toBeInTheDocument();
      fireEvent.click(screen.getByText("목록"));
    });
  });
});
