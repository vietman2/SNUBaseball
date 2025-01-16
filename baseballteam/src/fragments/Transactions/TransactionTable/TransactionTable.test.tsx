import { waitFor } from "@testing-library/react";

import {
  TransactionTableHeader,
  TransactionTableRow,
} from "./TransactionTable";
import { sampleTransactions } from "@data/accountings";
import { renderWithProviders, resizeWindow } from "@utils/test-utils";

describe("<TransactionTableHeader />", () => {
  it("should render", () => {
    renderWithProviders(<TransactionTableHeader />);
  });
});

describe("<TransactionTableRow />", () => {
  it("should render", async () => {
    renderWithProviders(
      <>
        <TransactionTableRow transaction={sampleTransactions[0]} />
        <TransactionTableRow transaction={sampleTransactions[1]} />
      </>
    );

    await waitFor(() => resizeWindow(400, 400));
    await waitFor(() => resizeWindow(1600, 1600));
  });
});
