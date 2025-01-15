import {
  TransactionTableHeader,
  TransactionTableRow,
} from "./TransactionTable";
import { sampleTransactions } from "@data/accountings";
import { renderWithProviders } from "@utils/test-utils";

describe("<TransactionTableHeader />", () => {
  it("should render", () => {
    renderWithProviders(<TransactionTableHeader />);
  });
});

describe("<TransactionTableRow />", () => {
  it("should render", () => {
    renderWithProviders(
      <>
        <TransactionTableRow transaction={sampleTransactions[0]} />
        <TransactionTableRow transaction={sampleTransactions[1]} />
      </>
    );
  });
});
