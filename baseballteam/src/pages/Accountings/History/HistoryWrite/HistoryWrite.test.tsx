import { fireEvent, screen, waitFor } from "@testing-library/react";
import * as Router from "react-router-dom";

import { HistoryWrite } from "./HistoryWrite";
import { sampleAccounts, sampleTransactions } from "@data/accountings";
import * as AccountsAPI from "@services/accountings/accounts";
import * as TransactionsAPI from "@services/accountings/transactions";
import { renderWithProviders } from "@utils/test-utils";

describe("<HistoryWrite />: create", () => {
  beforeEach(() => {
    jest.spyOn(window, "alert").mockImplementation(() => {});
    jest.spyOn(Router, "useLocation").mockReturnValue({
      pathname: "/accountings/history/new",
      hash: "",
      key: "",
      search: "",
      state: null,
    });
    jest.spyOn(Router, "useParams").mockReturnValue({ id: "1" });
    jest.spyOn(AccountsAPI, "getAccounts").mockResolvedValue(sampleAccounts);
  });

  it("handles api error", async () => {
    jest.spyOn(AccountsAPI, "getAccounts").mockResolvedValue(null);
    renderWithProviders(<HistoryWrite />);

    await waitFor(() => {
      fireEvent.click(screen.getByText("뒤로가기"));
    });
  });

  it("handles create correctly", async () => {
    jest.spyOn(TransactionsAPI, "createTransaction").mockResolvedValue(true);
    renderWithProviders(<HistoryWrite />);

    await waitFor(() => {
      fireEvent.change(screen.getByTestId("account-select"), {
        target: { value: "1" },
      });
      fireEvent.change(screen.getByTestId("amount-input"), {
        target: { value: "10000" },
      });
      fireEvent.change(screen.getByTestId("type-select"), {
        target: { value: "지출" },
      });
    });

    fireEvent.click(screen.getByText("저장"));
  });

  it("handles create fail", async () => {
    jest.spyOn(TransactionsAPI, "createTransaction").mockResolvedValue(null);
    renderWithProviders(<HistoryWrite />);

    await waitFor(() => {
      expect(screen.getByText("용돈")).toBeInTheDocument();
    });

    await waitFor(() => {
      fireEvent.change(screen.getByTestId("category-select"), {
        target: { value: "식비" },
      });
      fireEvent.change(screen.getByTestId("method-select"), {
        target: { value: "카드" },
      });
    });

    fireEvent.click(screen.getByText("저장"));
  });
});

describe("<HistoryWrite />: edit", () => {
  beforeEach(() => {
    jest.spyOn(window, "alert").mockImplementation(() => {});
    jest.spyOn(Router, "useLocation").mockReturnValue({
      pathname: "/accountings/history/1/edit",
      hash: "",
      key: "",
      search: "",
      state: null,
    });
    jest.spyOn(Router, "useParams").mockReturnValue({ id: "1" });
    jest.spyOn(AccountsAPI, "getAccounts").mockResolvedValue(sampleAccounts);
    jest
      .spyOn(TransactionsAPI, "getTransaction")
      .mockResolvedValue(sampleTransactions[0]);
  });

  it("handles path error", async () => {
    jest.spyOn(Router, "useParams").mockReturnValue({ id: undefined });
    renderWithProviders(<HistoryWrite />);

    await waitFor(() => {
      fireEvent.click(screen.getByText("뒤로가기"));
    });
  });

  it("handles api failure", async () => {
    jest.spyOn(TransactionsAPI, "getTransaction").mockResolvedValue(null);
    renderWithProviders(<HistoryWrite />);

    await waitFor(() => {
      fireEvent.click(screen.getByText("뒤로가기"));
    });
  });

  it("handles update correctly", async () => {
    jest.spyOn(TransactionsAPI, "updateTransaction").mockResolvedValue(true);
    renderWithProviders(<HistoryWrite />);

    await waitFor(() => {
      fireEvent.change(screen.getByTestId("date-input"), {
        target: { value: "2024-08-01" },
      });
      fireEvent.change(screen.getByTestId("notes-input"), {
        target: { value: "커피" },
      });
    });

    fireEvent.click(screen.getByText("저장"));
  });

  it("handles update fail", async () => {
    jest.spyOn(TransactionsAPI, "updateTransaction").mockResolvedValue(null);
    renderWithProviders(<HistoryWrite />);

    await waitFor(() => {
      fireEvent.change(screen.getByTestId("description-input"), {
        target: { value: "커피" },
      });
      fireEvent.change(screen.getByTestId("counterparty-input"), {
        target: { value: "카페" },
      });
    });

    fireEvent.click(screen.getByText("저장"));
  });
});
