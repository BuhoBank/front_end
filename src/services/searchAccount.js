import { API_URL } from "./config";

export const searchBankAccount = async (bankAccount) => {
  const response = await fetch(`${API_URL}/search_bank_account/${bankAccount}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    });
    return await response.json();
};


export default searchBankAccount;
