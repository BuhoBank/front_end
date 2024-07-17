import { API_URL } from "./config";

export const sendEmail = async (email_data) => {
  try {
    const response = await fetch(`${API_URL}/send_email`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(email_data),
    });

    if (!response.ok) {
      throw new Error("Send failed");
    }
    return await response.json();
  } catch (error) {
    console.error("Error during send code to email", error);
    throw error;
  }
};
