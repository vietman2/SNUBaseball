import axios from "axios";

import { getEquipment, getEquipmentDetails, updateEquipmentTips, updateEquipmentManager, updateEquipmentQuantity, addNewEquipment } from "./equipment";

describe("getEquipment", () => {
  it("hould return the data from the API", async () => {
    jest.spyOn(axios, "get").mockResolvedValue({ data: [] });

    const result = await getEquipment("location");

    expect(result).toEqual([]);
  });

  it("should return null if no response", async () => {
    jest.spyOn(axios, "get").mockRejectedValue(new Error());

    const result = await getEquipment("location");

    expect(result).toEqual(null);
  });
});

describe("getEquipmentDetails", () => {
  it("should return the data from the API", async () => {
    jest.spyOn(axios, "get").mockResolvedValue({ data: {} });

    const result = await getEquipmentDetails("equipmentId");

    expect(result).toEqual({});
  });

  it("should return null if no response", async () => {
    jest.spyOn(axios, "get").mockRejectedValue(new Error());

    const result = await getEquipmentDetails("equipmentId");

    expect(result).toEqual(null);
  });

  it("should return null if no equipmentId", async () => {
    const result = await getEquipmentDetails(undefined);

    expect(result).toEqual(null);
  });
});

describe("updateEquipmentTips", () => {
  it("should return the data from the API", async () => {
    jest.spyOn(axios, "patch").mockResolvedValue({ data: {} });

    const result = await updateEquipmentTips(1, "tips");

    expect(result).toEqual({});
  });

  it("should return null if no response", async () => {
    jest.spyOn(axios, "patch").mockRejectedValue(new Error());

    const result = await updateEquipmentTips(1, "tips");

    expect(result).toEqual(null);
  });
});

describe("updateEquipmentQuantity", () => {
  it("should return the data from the API", async () => {
    jest.spyOn(axios, "patch").mockResolvedValue({ data: {} });

    const result = await updateEquipmentQuantity(1, 1, 1, "notes");

    expect(result).toEqual({});
  });

  it("should return null if no response", async () => {
    jest.spyOn(axios, "patch").mockRejectedValue(new Error());

    const result = await updateEquipmentQuantity(1, 1, 1, "notes");

    expect(result).toEqual(null);
  });

  it("should return null if no equipmentId", async () => {
    const result = await updateEquipmentQuantity(1, undefined, 1, "notes");

    expect(result).toEqual(null);

    const result2 = await updateEquipmentQuantity(1, 1, 1, "");

    expect(result2).toEqual(null);
  });
});

describe("updateEquipmentManager", () => {
  it("should return the data from the API", async () => {
    jest.spyOn(axios, "patch").mockResolvedValue({ data: {} });

    const result = await updateEquipmentManager(1, [1]);

    expect(result).toEqual({});
  });

  it("should return null if no managerIds", async () => {
    const result = await updateEquipmentManager(1, []);

    expect(result).toEqual(null);
  });

  it("should return null if no response", async () => {
    jest.spyOn(axios, "patch").mockRejectedValue(new Error());

    const result = await updateEquipmentManager(1, [1]);

    expect(result).toEqual(null);
  });
});

describe("addNewEquipment", () => {
  it("should return the data from the API", async () => {
    jest.spyOn(axios, "patch").mockResolvedValue({ data: {} });

    const result = await addNewEquipment(1, "name", 1, "개", "창고", "notes");

    expect(result).toEqual({});
  });

  it("should return null if no categoryId", async () => {
    const result = await addNewEquipment(1, "", 1, "개", "창고", "notes");

    expect(result).toEqual(null);

    const result2 = await addNewEquipment(1, "name", 1, "", "창고", "notes");

    expect(result2).toEqual(null);

    const result3 = await addNewEquipment(1, "name", 1, "개", "창고", "");

    expect(result3).toEqual(null);
  });

  it("should return null if no response", async () => {
    jest.spyOn(axios, "patch").mockRejectedValue(new Error());

    const result = await addNewEquipment(1, "name", 1, "개", "창고", "notes");

    expect(result).toEqual(null);
  });
});
