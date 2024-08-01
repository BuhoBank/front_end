import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navigate from "../../components/navigate";
import { sendTransferData } from "../../services/transferService";
import { getClientAccounts } from "../../services/getAccountsService";
import searchBankAccount from "../../services/searchAccount";
import { sendEmailToTransfer } from "../../services/sendEmailTransfer";
import TransferCodePopup from "../../components/transferCode/transferCode";
import DashboardForm from "../../components/DashboardForm";
import HeaderDashboard from "../../components/headerDashboard";
import "../../styles/Dashboard-transfer.css";

const Transfer = () => {
  const navigate = useNavigate();
  const [selectedAccount, setSelectedAccount] = useState("");
  const [amount, setAmount] = useState("");
  const [beneficiary, setBeneficiary] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [description, setDescription] = useState("");
  const [notification, setNotification] = useState("");
  const [showSuccessPopup, setSuccess] = useState(false);
  const [showAll, setShowAll] = useState(false);
  const [showBeneficiary, setShowBeneficiary] = useState(false);
  const [showNotBalance, setShowNotBalance] = useState(false);
  const [showEnterCodePopup, setShowEnterCodePopup] = useState(false);
  const [showAcceptButton, setShowAcceptButton] = useState(true);

  const accountsFromLocalStorage = JSON.parse(localStorage.getItem("accounts")) || [];
  const user_email = localStorage.getItem('user_email');
  const userAccounts = accountsFromLocalStorage.map((account, index) => ({
    id: index + 1, // Asegúrate de tener un campo id en tus datos del localStorage
    name: account.name, // Nombre de la cuenta
    number: account.account_number, // Número de cuenta
    balance: account.balance,
  }));

  const handleTransfer = async (e) => {
    e.preventDefault();

    const emailData = {
      email: user_email
    };

    const selectedAccountNumber = parseInt(selectedAccount, 10);

    const account = userAccounts.find(acc => acc.number === selectedAccountNumber);

    if (amount > account.balance) {
      setShowNotBalance(true);
    } else {
      try {
        const responseEmail = await sendEmailToTransfer(emailData);
        if (responseEmail.code === "EMAIL_SEND") {
          setShowEnterCodePopup(true);
        }
      } catch (error) {
        console.log("error en send email code transfer", error);
      }
    }
  };

  const handleTransferAfterCode = async () => {
    // Lógica para manejar la transferencia
    const transferData = {
      selectedAccount,
      amount,
      beneficiary,
      accountNumber,
      description,
      notification,
    };

    const response = await sendTransferData(transferData);
    if (response.success) {
      console.log("Transferencia exitosa:", response.data);
      if (response.data.code === "TRANSFER_SUCCESSFUL") {
        setSuccess(true);
        const clientID = localStorage.getItem("clientID");
        const accountsResponse = await getClientAccounts(clientID);
        if (accountsResponse.success) {
          console.log("Cuentas del cliente:", accountsResponse.data);
          localStorage.removeItem("accounts");
          localStorage.setItem(
            "accounts",
            JSON.stringify(accountsResponse.data.accounts_list)
          );
          const data = JSON.parse(localStorage.getItem("accounts"));
          console.log(data);
        } else {
          setError("Error al obtener las cuentas del cliente");
        }
      } else if (response.data.code === "NOT_BALANCE") {
        setShowNotBalance(true);
      }
    } else {
      console.error("Error al realizar la transferencia:", response.error);
      alert("Ocurrio un error al realizar la transferencia, intentelo mas tarde");
    }
  };

  const handleCloseSuccessPopup = () => {
    navigate("/dashboard");
  };

  const handleReturn = () => {
    setShowNotBalance(false);
  };

  const handleReturnCode = () => {
    setShowEnterCodePopup(false);
  };

  const handleBlur = async (e) => {
    e.preventDefault();
    if (accountNumber === selectedAccount) {
      alert("La cuenta bancaria a la que va a realizar la transferencia es la misma de la que seleccionó, por favor ingrese un número de cuenta distinto");
      setAccountNumber("");
    } else if (accountNumber.length < 8) {
      alert("Debe ingresar una cuenta bancaria de 8 dígitos");
      setAccountNumber("");
    } else if (selectedAccount === "") {
      alert("Debe seleccionar una cuenta bancaria para realizar la transferencia");
    } else {
      const response = await searchBankAccount(accountNumber);
      console.log(response);
      if (response.code === "TRUE_ACCOUNT") {
        setBeneficiary(response.name);
        setShowBeneficiary(true);
        setShowAll(true);
        setShowAcceptButton(false); // Ocultar el botón de Aceptar
      } else {
        console.error("Error al consultar la cuenta bancaria:", response.error);
        alert("El número de cuenta no existe, por favor verifique la información");
        setAccountNumber("");
      }
    }
  };

  const handleChangeAccount = () => {
    setShowBeneficiary(false);
    setShowAll(false);
    setShowAcceptButton(true);
    setAccountNumber(""); // O puedes optar por mantener el número de cuenta actual
  };

  const handleReturnForSetAccountsNumber = () => {
    setShowBeneficiary(false);
    setShowAll(false);
    setShowAcceptButton(true);
    setSelectedAccount(""); // Restablece la selección de cuenta
    setAccountNumber(""); // Limpia el campo del número de cuenta
  };

  return (
    <div className="transfer">
      <aside className="sidebar">
        <DashboardForm />
      </aside>

      <main className="main-content">
        <HeaderDashboard />
        <h1>Transferencias Directas</h1>
        <div className="account-info">
          <p><strong>Seleccione el número de cuenta bancaria desde la cual va a realizar la transferencia:</strong></p>
          <select
            id="account-select"
            value={selectedAccount}
            onChange={(e) => setSelectedAccount(e.target.value)}
            disabled={showBeneficiary}
          >
            <option value="">Seleccione una cuenta</option>
            {userAccounts.map((account) => (
              <option key={account.id} value={account.number}>
                {account.number}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <p><strong>Ingrese el número de cuenta bancaria a la que va a realizar la transferencia:</strong></p>
          <input
            type="text"
            placeholder="Número de cuenta"
            value={accountNumber}
            onChange={(e) => setAccountNumber(e.target.value)}
            // onBlur={handleBlur}
            disabled={showBeneficiary}
            required
          />
          {showAcceptButton && (
            <button onClick={handleBlur}>Aceptar</button>
          )}
          {!showBeneficiary ? (
            <p>Debe ingresar un número de 8 dígitos</p>
          ) : (
            <input
              type="text"
              id="beneficiary"
              value={beneficiary}
              onChange={(e) => setBeneficiary(e.target.value)}
              required
              placeholder="Nombre del beneficiario"
              disabled={showBeneficiary}
            />
          )}
          {showBeneficiary && !showAll && (
            <button onClick={handleChangeAccount}>Cambiar número de cuenta</button>
          )}
        </div>

        {showAll && (
          <form className="transfer-form" onSubmit={handleTransfer}>
            <div className="form-group">
              <div className="amount-input">
                <span>$</span>
                <input
                  type="number"
                  id="amount"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="Ingrese el valor a transferir"
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <input
                type="text"
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                maxLength="150"
                placeholder="Descripción (Opcional)"
              />
            </div>
            <div className="form-group">
              <input
                type="email"
                id="notification"
                value={notification}
                onChange={(e) => setNotification(e.target.value)}
                placeholder="Correo electrónico (Opcional)"
              />
            </div>
            <div className="form-actions">
              <button type="button" onClick={handleReturnForSetAccountsNumber}>Regresar</button>
              <button type="reset" className="btn-secondary">
                Limpiar
              </button>
              <button type="submit" className="btn-primary">
                Continuar
              </button>
            </div>
          </form>
        )}
      </main>
      {showSuccessPopup && (
        <div className="success-popup">
          <h1>Transferencia realizada con éxito</h1>
          <p>Desde cuenta: {selectedAccount}</p>
          <p>Hacia cuenta: {accountNumber}</p>
          <p>Beneficiario: {beneficiary}</p>
          <p>Monto transferido: {amount}$</p>
          {description && (<p>Descripción: {description}</p>)}
          <button onClick={handleCloseSuccessPopup}>Ir a mis cuentas</button>
        </div>
      )}
      {showNotBalance && (
        <div className="success-popup">
          <p style={{ color: 'red' }}>No tiene suficientes fondos para realizar la transferencia</p>
          <button onClick={handleReturn} style={{ display: 'block', margin: '0 auto' }}>Intentar de nuevo</button>
        </div>
      )}
      {showEnterCodePopup && (
        <TransferCodePopup handleTransfer={handleTransferAfterCode} handleClose={handleReturnCode} />
      )}
    </div>
  );
};

export default Transfer;
