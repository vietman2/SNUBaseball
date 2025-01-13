import { fireEvent, screen, waitFor } from "@testing-library/react";
import * as Router from "react-router-dom";

import { HistoryDetail } from "./HistoryDetail";
import { sampleTransactions } from "@data/accountings";
import * as AccountingsAPI from "@services/accountings/transactions";
import { renderWithProviders } from "@utils/test-utils";

describe("<HistoryDetail />", () => {
  beforeEach(() => {
    jest.spyOn(console, "error").mockImplementation(() => {});
    jest.spyOn(Router, "useParams").mockReturnValue({ id: "1" });
    jest
      .spyOn(AccountingsAPI, "getTransaction")
      .mockResolvedValue(sampleTransactions[0]);
  });

  it("handles error correctly", async () => {
    jest.spyOn(AccountingsAPI, "getTransaction").mockResolvedValue(null);
    renderWithProviders(<HistoryDetail />);

    await waitFor(() => {
      fireEvent.click(screen.getByText("뒤로가기"));
    });
  });

  it("handles edit navigation", async () => {
    renderWithProviders(<HistoryDetail />);

    await waitFor(() => {
      fireEvent.click(screen.getByTestId("toggle"));
      fireEvent.click(screen.getByText("수정하기"));
    });
  });

  it("handles delete", async () => {
    jest
      .spyOn(AccountingsAPI, "getTransaction")
      .mockResolvedValue(sampleTransactions[1]);
    jest
      .spyOn(AccountingsAPI, "deleteTransaction")
      .mockResolvedValue(true);
    renderWithProviders(<HistoryDetail />);

    await waitFor(() => {
      fireEvent.click(screen.getByTestId("toggle"));
      fireEvent.click(screen.getByText("삭제하기"));
    });
  });

  it("handles delete fail", async () => {
    jest.spyOn(AccountingsAPI, "deleteTransaction").mockResolvedValue(null);
    renderWithProviders(<HistoryDetail />);

    await waitFor(() => {
      fireEvent.click(screen.getByTestId("toggle"));
      fireEvent.click(screen.getByText("삭제하기"));
    });
  });
});
