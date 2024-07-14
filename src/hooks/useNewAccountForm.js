import { useState } from "react";
import { createBankAccount } from "../services/accountService";

const useNewAccountForm = () => {
    const [error, setError] = useState("");

    const handleNewAccountSubmit = async (id) => {
        setError("");
        try {
            const response = await createBankAccount({ id });
            if (response.success) {
                console.log("Cuenta creada con éxito", response.data);
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
