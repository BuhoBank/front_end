import { useState, useEffect } from "react";
import { API_URL } from "../services/config";

const useAccountData = () => {
  const [accountData, setAccountData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`${API_URL}/cuenta`)
      .then((response) => response.json())
      .then((data) => {
        setAccountData({
          accountNumber: data.accountNumber,
          balance: data.balance,
        });
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error al obtener los datos de la cuenta:", error);
        setError(error);
        setLoading(false);
      });
  }, []);

  return { accountData, loading, error };
};

export default useAccountData;
