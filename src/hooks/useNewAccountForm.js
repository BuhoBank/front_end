import { useState } from "react";
import { createBankAccount } from "../services/accountService";
import { getClientAccounts } from "../services/getAccountsService";

const useNewAccountForm = () => {
    const [error, setError] = useState("");

    const handleNewAccountSubmit = async (id) => {
        setError("");
        try {
            const clientID = localStorage.getItem('clientID');
            const response = await createBankAccount({ id });
            if (response.success) {
                console.log("Cuenta creada con éxito", response.data);
                const accountsResponse = await getClientAccounts(clientID);
                console.log("Tipo de datos de la respuesta:", typeof accountsResponse);
                if (accountsResponse.success) {
                    console.log("Cuentas del cliente:", accountsResponse.data);
                    localStorage.removeItem('accounts');
                    localStorage.setItem('accounts', JSON.stringify(accountsResponse.data.accounts_list));
                    const data = JSON.parse(localStorage.getItem('accounts'));
                    console.log(data)
                } else {
                    setError("Error al obtener las cuentas del cliente");
                }
            } else {
                setError("Algo salió mal al crear la cuenta");
            }
        } catch (error) {
            setError("Error al intentar crear cuenta");
            console.error("Error durante la creación de cuenta", error);
        }
    };

    return { error, handleNewAccountSubmit };
};

export default useNewAccountForm;
