import axios from "axios";

export async function getTransactions(page: number) {
  try {
    const response = await axios.get("/v1/transactions/", {
      params: {
        page,
      },
    });

    return response.data;
  } catch {
    return null;
  }
}

export async function getTransaction(id: string | undefined) {
  if (!id) {
    return null;
  }

  try {
    const response = await axios.get(`/v1/transactions/${id}/`);

    return response.data;
  } catch {
    return null;
  }
}

export async function createTransaction(data: {
  accountId: string;
  amount: number;
  date: string;
  description: string;
  type: string;
  category: string;
  paymentMethod: string;
  counterParty: string;
  notes: string;
}) {
  try {
    await axios.post("/v1/transactions/", {
      account_id: data.accountId,
      amount: data.amount,
      date: data.date,
      description: data.description,
      type: data.type,
      category: data.category,
      method: data.paymentMethod,
      counter_party: data.counterParty,
      notes: data.notes,
    });

    return true;
  } catch {
    return null;
  }
}

export async function deleteTransaction(id: string | undefined) {
  if (!id) {
    return null;
  }

  try {
    await axios.delete(`/v1/transactions/${id}/`);

    return true;
  } catch {
    return null;
  }
}

export async function updateTransaction(
  id: string | undefined,
  data: {
    accountId: string;
    amount: number;
    date: string;
    description: string;
    type: string;
    category: string;
    paymentMethod: string;
    counterParty: string;
    notes: string;
  }
) {
  if (!id) {
    return null;
  }

  try {
    await axios.put(`/v1/transactions/${id}/`, {
      account_id: data.accountId,
      amount: data.amount,
      date: data.date,
      description: data.description,
      type: data.type,
      category: data.category,
      method: data.paymentMethod,
      counter_party: data.counterParty,
      notes: data.notes,
    });

    return true;
  } catch {
    return null;
  }
}
