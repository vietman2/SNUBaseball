import { fireEvent, screen, waitFor } from "@testing-library/react";

import { ResultsList } from "./ResultsList";
import { sampleTournament } from "@data/records";
import * as RecordsAPI from "@services/records/results";
import { renderWithProviders } from "@utils/test-utils";

jest.mock("@fragments/Results", () => ({
  Tournament: () => <div data-testid="tournament" />,
}));

describe("<ResultsList />", () => {
  it("should render the component", async () => {
    jest.spyOn(RecordsAPI, "getResults").mockResolvedValue([sampleTournament]);

    renderWithProviders(<ResultsList />);

    await waitFor(() => {
      expect(screen.getByTestId("tournament")).toBeInTheDocument();
    });

    await waitFor(() => {
      fireEvent.change(screen.getByTestId("year-select"), {
        target: { value: "2024" },
      });
    });
  });

  it("should handle api error", async () => {
    jest.spyOn(RecordsAPI, "getResults").mockResolvedValue(null);

    await waitFor(() => renderWithProviders(<ResultsList />));
  });
});
