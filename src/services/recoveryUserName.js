import { API_URL} from "./config";

export const recoverUser = async (email) => {
  const response = await fetch(`${API_URL}/recover_user/${email}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    });
    return await response.json();
};

export default recoverUser;