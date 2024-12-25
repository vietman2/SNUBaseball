export type EquipmentCategoryType = {
  id: number;
  name: string;
  person_in_charge: string[];
  location: EquipmentLocationType[];
  updated_at: string;
};

export type EquipmentLocationType = {
  name: string;
  equipment: EquipmentSimpleType[];
}

export type EquipmentSimpleType = {
  id: number;
  name: string;
  quantity: string;
};

export type EquipmentDetailType = {
  id: number;
  name: string;
  person_in_charge: string[];
  management_tips: string;
  location: EquipmentLocationType[];
  history: EquipmentUpdateHistoryType[];
  is_in_charge: boolean;
};

type EquipmentUpdateHistoryType = {
  id: number;
  person: string;
  summary: string;
  details: string;
  updated_at: string;
  notes?: string;
};
