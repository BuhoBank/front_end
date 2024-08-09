import { API_URL2} from "./config";

export const searchPaymentAcount = async (NumCi_Params) => {
  const response = await fetch(`${API_URL2}/search_bill/${NumCi_Params}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    });
    return await response.json();
};

export default searchPaymentAcount;