export type CategoryType = {
  name: string;
  color: string;
};

export type HistorySimpleType = {
  id: number;
  account: string;
  amount: number;
  description: string;
  type: "수입" | "지출";
  category: CategoryType;
  date: string;
  method: string;
};
