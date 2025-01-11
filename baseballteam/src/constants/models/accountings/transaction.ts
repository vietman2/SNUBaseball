type AccountType = {
  id: string;
  label: string;
  color: string;
  background_color: string;
};

export type TransactionType = {
  id: string;
  account: AccountType;
  amount: number;
  description: string;
  type: string;
  category: string;
  counter_party: string;
  balance_after: number;
  person_in_charge: string;
  date: string;
};
