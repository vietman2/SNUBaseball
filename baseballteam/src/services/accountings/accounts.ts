import axios from "axios";

export async function getAccounts() {
  try {
    const response = await axios.get("/v1/accounts/");

    return response.data;
  } catch {
    return null;
  }
}
