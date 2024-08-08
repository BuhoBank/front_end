import { API_URL } from "./config";

export const sendEmail = async (data) => {

  const response = await fetch(`${API_URL}/send_email`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
    });
    return await response.json();

};
