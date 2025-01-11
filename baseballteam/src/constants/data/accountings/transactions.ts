import { TransactionType } from "@models/accountings";

export const sampleTransactions: TransactionType[] = [
  {
    id: "1",
    account: {
      id: "1",
      label: "부비",
      color: "#000000",
      background_color: "#ffffff",
    },
    amount: 100000,
    description: "월급",
    type: "수입",
    category: "급여",
    counter_party: "나",
    balance_after: 100000,
    person_in_charge: "나",
    date: "2021-08-01",
  },
  {
    id: "2",
    account: {
      id: "1",
      label: "부비",
      color: "#000000",
      background_color: "#ffffff",
    },
    amount: 50000,
    description: "점심",
    type: "지출",
    category: "식비",
    counter_party: "외식",
    balance_after: 50000,
    person_in_charge: "나",
    date: "2021-08-02",
  },
];
