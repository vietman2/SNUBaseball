import axios from "axios";

export async function getEquipment(location: string) {
  try {
    const response = await axios.get("/v1/equipment/", {
      params: {
        location,
      },
    });

    return response.data;
  } catch {
    return null;
  }
}

export async function getEquipmentDetails(equipmentId: string | undefined) {
  if (!equipmentId) return null;

  try {
    const response = await axios.get(`/v1/equipment/${equipmentId}/`);

    return response.data;
  } catch {
    return null;
  }
}

export async function updateEquipmentTips(equipmentId: number, tips: string) {
  try {
    const response = await axios.patch(`/v1/equipment/${equipmentId}/`, {
      management_tips: tips,
    });

    return response.data;
  } catch {
    return null;
  }
}

export async function updateEquipmentQuantity(
  categoryId: number,
  equipmentId: number | undefined,
  quantity: number,
  notes: string
) {
  if (!equipmentId || !notes) return null;

  try {
    const response = await axios.patch(
      `/v1/equipment/${categoryId}/quantity/`,
      {
        equipment_id: equipmentId,
        quantity,
        notes,
      }
    );

    return response.data;
  } catch {
    return null;
  }
}

export async function updateEquipmentManager(
  equipmentId: number,
  managerIds: number[]
) {
  if (managerIds.length === 0) return null;

  try {
    const response = await axios.patch(
      `/v1/equipment/${equipmentId}/managers/`,
      {
        manager_ids: managerIds,
      }
    );

    return response.data;
  } catch {
    return null;
  }
}

export async function addNewEquipment(
  categoryId: number,
  name: string,
  quantity: number,
  unit: string,
  selectedLocation: string,
  notes: string
) {
  if (!name || !unit || !notes) return null;

  try {
    const response = await axios.patch(`/v1/equipment/${categoryId}/new/`, {
      name,
      quantity,
      unit,
      location: selectedLocation,
      notes,
    });

    return response.data;
  } catch {
    return null;
  }
}
