export type AccountType = {
  id: number;
  label: string;
  color: string;
  background_color: string;
};

export type TransactionType = {
  id: number;
  account: AccountType;
  amount: number;
  description: string;
  type: string;
  category: string;
  method: string;
  counter_party: string;
  balance_after: number;
  date: string;
  notes: string;
};
