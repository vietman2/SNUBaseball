export type EquipmentSimpleType = {
  id: number;
  name: string;
  number: string;
  status: string;
  updated_at: string;
};

export type EquipmentCategoryType = {
  [category: string]: {
    manager: string;
    equipment: EquipmentSimpleType[];
  };
};

export type EquipmentResponseType = {
  [location: string]: EquipmentCategoryType;
};

export type EquipmentUpdateHistoryType = {
  id: number;
  date: string;
  manager: string;
  summary: string;
  description: string;
};

export type EquipmentDetailType = {
  id: number;
  name: string;
  location: string;
  number: string;
  status: string;
  updated_at: string;
  manager: string;
  management_outline: string;
  history: EquipmentUpdateHistoryType[];
};
