import axios from "axios";

export async function getTransactions() {
  try {
    const response = await axios.get("/v1/transactions/");

    return response.data;
  } catch {
    return null;
  }
}
