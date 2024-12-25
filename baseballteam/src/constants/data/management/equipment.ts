import {
  EquipmentCategoryType,
  EquipmentDetailType,
  EquipmentLocationType,
  EquipmentSimpleType,
  //EquipmentUpdateHistoryType,
} from "@models/management";

const sampleEquipmentSimple: EquipmentSimpleType = {
  id: 1,
  name: "교내대회용 시합구",
  quantity: "2타",
};

const sampleEquipmentLocation: EquipmentLocationType = {
  name: "창고",
  equipment: [sampleEquipmentSimple],
};

export const sampleEquipmentCategory: EquipmentCategoryType[] = [
  {
    id: 1,
    name: "배트",
    person_in_charge: ["김유안", "양서진"],
    location: [
      sampleEquipmentLocation,
      {
        name: "부실",
        equipment: [sampleEquipmentSimple],
      },
    ],
    updated_at: "2024-10-01",
  },
  {
    id: 2,
    name: "볼",
    person_in_charge: ["김유안", "양서진"],
    location: [],
    updated_at: "2024-10-01",
  },
];

export const sampleEquipmentDetail: EquipmentDetailType = {
  id: 1,
  name: "배트",
  person_in_charge: ["김유안", "양서진"],
  location: [
    sampleEquipmentLocation,
    {
      name: "부실",
      equipment: [sampleEquipmentSimple],
    },
  ],
  management_tips: "배트는 매일 사용 후 청소를 해주세요.",
  history: [
    {
      id: 1,
      person: "김유안",
      summary: "담당자 변경",
      details: "김유안 -> 양서진",
      notes: "담당자 변경",
      updated_at: "2024-10-01",
    },
  ],
  is_in_charge: true,
};
