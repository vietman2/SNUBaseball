import axios from "axios";

import { getTransactions } from "./transactions";

describe("getTransactions", () => {
  it("should return transactions", async () => {
    jest.spyOn(axios, "get").mockResolvedValue({ data: "transactions" });
    const transactions = await getTransactions();

    expect(transactions).toBe("transactions");
  });

  it("should return null when an error occurs", async () => {
    jest.spyOn(axios, "get").mockRejectedValue(new Error());
    const transactions = await getTransactions();

    expect(transactions).toBeNull();
  });
});
