import {
  EquipmentCategoryType,
  EquipmentDetailType,
  EquipmentResponseType,
  EquipmentSimpleType,
  EquipmentUpdateHistoryType,
} from "@models/management";

const sampleEquipmentCategory1: EquipmentCategoryType = {
  나무방망이: {
    manager: "양서진",
    equipment: [
      {
        id: 1,
        name: "연습용 나무방망이",
        number: "12자루",
        status: "보통",
        updated_at: "2024-10-01",
      },
      {
        id: 2,
        name: "시합용 나무방망이",
        number: "1자루",
        status: "양호",
        updated_at: "2024-10-01",
      },
    ],
  },
};

const sampleEquipmentCategory2: EquipmentCategoryType = {
  나무방망이: {
    manager: "강지민",
    equipment: [
      {
        id: 3,
        name: "연습용 나무방망이",
        number: "5자루",
        status: "최상",
        updated_at: "2024-10-01",
      },
      {
        id: 4,
        name: "시합용 나무방망이",
        number: "2자루",
        status: "최상",
        updated_at: "2024-10-01",
      },
    ],
  },
};

export const sampleEquipmentSimple: EquipmentSimpleType = {
  id: 5,
  name: "교내대회용 시합구",
  number: "2타",
  status: "New",
  updated_at: "2024-10-01",
};

export const sampleEquipmentResponse: EquipmentResponseType = {
  창고: sampleEquipmentCategory1,
  아카데미: sampleEquipmentCategory2,
  부실: {
    야구공: {
      manager: "김유안",
      equipment: [sampleEquipmentSimple],
    },
  },
};

const sampleEquipmentUpdateHistory: EquipmentUpdateHistoryType[] = [
  {
    id: 1,
    date: "09/01",
    manager: "김정규",
    summary: "담당자 변경",
    description: "김정규 -> 양서진",
  },
  {
    id: 2,
    date: "10/01",
    manager: "양서진",
    summary: "수량 변경",
    description: "14 -> 12 (훈련 중 2자루 부러짐)",
  },
];

export const sampleEquipmentDetail: EquipmentDetailType = {
  id: 1,
  name: "연습용 나무방망이",
  location: "창고",
  number: "12자루",
  status: "보통",
  updated_at: "2024-10-01",
  manager: "양서진",
  management_outline:
    "매주 월요일에 창고에서 나무방망이를 정리한다. 부러지면 부주장에게 보고",
  history: sampleEquipmentUpdateHistory,
};
