import { AccountType, TransactionType } from "@models/accountings";

export const sampleAccounts: AccountType[] = [
  {
    id: 1,
    label: "부비",
    color: "#000000",
    background_color: "#ffffff",
  },
  {
    id: 2,
    label: "용돈",
    color: "#ffffff",
    background_color: "#000000",
  },
];

export const sampleTransactions: TransactionType[] = [
  {
    id: 1,
    account: sampleAccounts[0],
    amount: 100000,
    description: "월급",
    type: "수입",
    category: "급여",
    method: "계좌이체",
    counter_party: "나",
    balance_after: 100000,
    date: "2021-08-01",
    notes: "",
  },
  {
    id: 2,
    account: sampleAccounts[0],
    amount: 50000,
    description: "점심",
    type: "지출",
    category: "식비",
    method: "카드",
    counter_party: "외식",
    balance_after: 50000,
    date: "2021-08-02",
    notes: "",
  },
];
