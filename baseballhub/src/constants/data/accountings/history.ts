import {
  CategoryType,
  HistoryDetailType,
  HistorySimpleType,
} from "@models/accountings";

const sampleIncomeCategories: CategoryType[] = [
  {
    name: "후원",
    color: "#4CAF50",
  },
  {
    name: "지원금",
    color: "#009688",
  },
  {
    name: "회비",
    color: "#607D8B",
  },
  {
    name: "기타",
    color: "#795548",
  },
];

const sampleSpendingCategories: CategoryType[] = [
  {
    name: "식비",
    color: "#FF5722",
  },
  {
    name: "교통비",
    color: "#9C27B0",
  },
  {
    name: "숙박비",
    color: "#3F51B5",
  },
  {
    name: "기타",
    color: "#795548",
  },
];

export const sampleHistory: HistorySimpleType[] = [
  {
    id: 1,
    account: "부비계좌",
    amount: 100000,
    description: "신인식 교수님 후원금",
    type: "수입",
    category: sampleIncomeCategories[0],
    date: "2024-09-01",
    method: "계좌이체",
  },
  {
    id: 2,
    account: "발전기금",
    amount: 500000,
    description: "밀양 시합 버스 대절료",
    type: "지출",
    category: sampleSpendingCategories[1],
    date: "2024-09-01",
    method: "계좌이체",
  },
  {
    id: 3,
    account: "진흥원 지원금",
    amount: 9000000,
    description: "24년도 1학기 운동부 지원금",
    type: "수입",
    category: sampleIncomeCategories[1],
    date: "2024-09-01",
    method: "지급",
  },
  {
    id: 4,
    account: "부비계좌",
    amount: 150000,
    description: "9월 5일 점심식사",
    type: "지출",
    category: sampleSpendingCategories[0],
    date: "2024-09-01",
    method: "카드결제",
  },
  {
    id: 5,
    account: "진흥원 지원금",
    amount: 500000,
    description: "밀양 시합 숙박비",
    type: "지출",
    category: sampleSpendingCategories[2],
    date: "2024-09-01",
    method: "계좌이체",
  },
  {
    id: 6,
    account: "부비계좌",
    amount: 360000,
    description: "24년도 10월 식비",
    type: "수입",
    category: sampleIncomeCategories[2],
    date: "2024-09-01",
    method: "계좌이체",
  },
  {
    id: 7,
    account: "부비계좌",
    amount: 500,
    description: "예금 이자",
    type: "수입",
    category: sampleIncomeCategories[3],
    date: "2024-09-01",
    method: "지급",
  },
  {
    id: 8,
    account: "부비계좌",
    amount: 10000,
    description: "간식비",
    type: "지출",
    category: sampleSpendingCategories[3],
    date: "2024-09-01",
    method: "카드결제",
  },
];

export const sampleHistoryDetail: HistoryDetailType = {
  id: 1,
  account: "부비계좌",
  amount: 100000,
  description: "신인식 교수님 후원금",
  type: "수입",
  category: sampleIncomeCategories[0],
  date: "2024-09-01",
  method: "계좌이체",
  counterparty: "신인식 교수님",
  balance: 1000000,
  manager: "김유안",
  note: "신인식 교수님 후원금",
};
