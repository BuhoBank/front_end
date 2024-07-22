import { API_URL } from "./config";

export const sendRecoveryCode = async (data) => {
  const response = await fetch(`${API_URL}/recover_password`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
    });
    return await response.json();

};

export default sendRecoveryCode;
