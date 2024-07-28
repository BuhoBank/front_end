import { API_URL } from "./config";

export const sendEmailToTransfer = async (data) => {

  const response = await fetch(`${API_URL}/send_email_to_transfer`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
    });
    return await response.json();

};
