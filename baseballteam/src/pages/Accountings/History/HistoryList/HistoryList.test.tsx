import { fireEvent, screen, waitFor } from "@testing-library/react";
import * as Router from "react-router-dom";

import { HistoryList } from "./HistoryList";
import { sampleTransactions } from "@data/accountings";
import * as TransactionsAPI from "@services/accountings/transactions";
import { renderWithProviders } from "@utils/test-utils";

jest.mock("@fragments/Transactions", () => ({
  TransactionTableHeader: () => <div>TransactionTableHeader</div>,
  TransactionTableRow: () => <div>TransactionTableRow</div>,
}));

describe("<HistoryList />", () => {
  beforeEach(() => {
    jest.spyOn(Router, "useLocation").mockReturnValue({
      pathname: "/accountings/history",
      search: "",
      hash: "",
      state: null,
      key: "abc123",
    });
    jest.spyOn(TransactionsAPI, "getTransactions").mockResolvedValue({
      results: sampleTransactions,
      num_pages: 3,
      current_page: 1,
    });
  });

  it("handles api error", async () => {
    jest.spyOn(TransactionsAPI, "getTransactions").mockResolvedValue(null);
    renderWithProviders(<HistoryList />);

    await waitFor(() => {
      fireEvent.click(screen.getByText("새로고침"));
    });
  });

  it("handles background", () => {
    jest.spyOn(Router, "useLocation").mockReturnValue({
      pathname: "/accountings/history/1/",
      search: "",
      hash: "",
      state: null,
      key: "abc123",
    });
    renderWithProviders(<HistoryList />);
  });

  it("handles filters and navigate", async () => {
    jest.spyOn(Router, "useNavigate").mockReturnValue(jest.fn());
    renderWithProviders(<HistoryList />);

    await waitFor(() => {
      fireEvent.click(screen.getByTestId("filter-button"));
      fireEvent.change(screen.getByTestId("month-filter"), {
        target: { value: "2021-01" },
      });
      fireEvent.change(screen.getByTestId("account-filter"), {
        target: { value: "기타" },
      });
      fireEvent.change(screen.getByTestId("type-filter"), {
        target: { value: "수입" },
      });
      fireEvent.click(screen.getByText("취소"));
      fireEvent.click(screen.getByText("적용"));
      fireEvent.click(screen.getByText("내역 추가"));
      fireEvent.click(screen.getByTestId("page-2"));
    });

    await waitFor(() => {
      expect(screen.getByTestId("transaction-1")).toBeInTheDocument();
      fireEvent.click(screen.getByTestId("transaction-1"));
    });
  });
});
