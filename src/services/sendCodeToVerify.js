import { API_URL } from "./config";

export const sendCode = async (data) => {
  const response = await fetch(`${API_URL}/verify_code_email`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
    });
    return await response.json();

};
