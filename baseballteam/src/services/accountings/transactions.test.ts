import axios from "axios";

import {
  createTransaction,
  deleteTransaction,
  updateTransaction,
  getTransactions,
  getTransaction,
} from "./transactions";

describe("getTransactions", () => {
  it("should return transactions", async () => {
    jest.spyOn(axios, "get").mockResolvedValue({ data: "transactions" });
    const transactions = await getTransactions(1);

    expect(transactions).toBe("transactions");
  });

  it("should return null when an error occurs", async () => {
    jest.spyOn(axios, "get").mockRejectedValue(new Error());
    const transactions = await getTransactions(1);

    expect(transactions).toBeNull();
  });
});

describe("getTransaction", () => {
  it("should return a transaction", async () => {
    jest.spyOn(axios, "get").mockResolvedValue({ data: "transaction" });
    const transaction = await getTransaction("1");

    expect(transaction).toBe("transaction");
  });

  it("should return null when an error occurs", async () => {
    jest.spyOn(axios, "get").mockRejectedValue(new Error());
    const transaction = await getTransaction("1");

    expect(transaction).toBeNull();
  });

  it("should return null when id is not provided", async () => {
    const transaction = await getTransaction(undefined);

    expect(transaction).toBeNull();
  });
});

describe("createTransaction", () => {
  const createData = {
    accountId: "1",
    amount: 100,
    date: "2021-01-01",
    description: "test",
    type: "expense",
    category: "test",
    paymentMethod: "cash",
    counterParty: "test",
    notes: "test",
  };

  it("should return true when transaction is created", async () => {
    jest.spyOn(axios, "post").mockResolvedValue({});
    const result = await createTransaction(createData);

    expect(result).toBe(true);
  });

  it("should return null when an error occurs", async () => {
    jest.spyOn(axios, "post").mockRejectedValue(new Error());
    const result = await createTransaction(createData);

    expect(result).toBeNull();
  });
});

describe("deleteTransaction", () => {
  it("should return null when id is not provided", async () => {
    const result = await deleteTransaction(undefined);

    expect(result).toBeNull();
  });

  it("should return null when an error occurs", async () => {
    jest.spyOn(axios, "delete").mockRejectedValue(new Error());
    const result = await deleteTransaction("1");

    expect(result).toBeNull();
  });

  it("should return true when transaction is deleted", async () => {
    jest.spyOn(axios, "delete").mockResolvedValue({});
    const result = await deleteTransaction("1");

    expect(result).toBe(true);
  });
});

describe("updateTransaction", () => {
  const updateData = {
    accountId: "1",
    amount: 100,
    date: "2021-01-01",
    description: "test",
    type: "expense",
    category: "test",
    paymentMethod: "cash",
    counterParty: "test",
    notes: "test",
  };

  it("should return true when transaction is updated", async () => {
    jest.spyOn(axios, "put").mockResolvedValue({});
    const result = await updateTransaction("1", updateData);

    expect(result).toBe(true);
  });

  it("should return null when id is not provided", async () => {
    const result = await updateTransaction(undefined, updateData);

    expect(result).toBeNull();
  });

  it("should return null when an error occurs", async () => {
    jest.spyOn(axios, "put").mockRejectedValue(new Error());
    const result = await updateTransaction("1", updateData);

    expect(result).toBeNull();
  });
});
