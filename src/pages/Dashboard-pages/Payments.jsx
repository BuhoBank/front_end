import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/Dashboard-payments.css";
import InputGroup from "../../components/InputGroup";
import DashboardForm from "../../components/DashboardForm";
import HeaderDashboard from "../../components/headerDashboard";
import { searchPaymentAcount } from "../../services/searchPayments";
import { sendTransferServiceData } from "../../services/payService";
import { getClientAccounts } from "../../services/getAccountsService";

const Payments = () => {
  const navigate = useNavigate();
  const [isSelecter, setIsSelecter] = useState(false);
  const [service, setService] = useState(null);
  const [contractNumber, setContractNumber] = useState("");
  const [success, setSuccess] = useState(false);
  const [paymentData, setPaymentData] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [selectedAccount, setSelectedAccount] = useState("");
  const [showAccountSelection, setShowAccountSelection] = useState(false);
  const [showConfirmPopup, setShowConfirmPopup] = useState(false);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [beneficiary, setBeneficiary] = useState(""); // Agregar estado para beneficiario
  const [accountNumber, setAccountNumber] = useState(""); // Agregar estado para cuenta de destino
  const [description, setDescription] = useState(""); // Agregar estado para descripción

  const accountsFromLocalStorage = JSON.parse(localStorage.getItem("accounts")) || [];
  const userAccounts = accountsFromLocalStorage.map((account, index) => ({
    id: index + 1,
    name: account.name,
    number: account.account_number,
    balance: parseFloat(account.balance).toFixed(2), // Redondear el saldo a dos decimales
  }));

  useEffect(() => {
    const storedPaymentData = JSON.parse(localStorage.getItem('paymentData'));
    if (storedPaymentData) {
      setPaymentData(storedPaymentData);
      setSuccess(true);
    }
  }, []);

  const handleButtonClick = (selectedService) => {
    setIsSelecter(true);
    setService(selectedService);
    setSuccess(false);
    setPaymentData(null);
    setContractNumber("");
  };

  const getServiceSuffix = () => {
    switch (service) {
      case 1:
        return "0"; // Luz
      case 2:
        return "1"; // Agua
      case 3:
        return "2"; // Internet
      case 4:
        return "3"; // Teléfono
      default:
        return "";
    }
  };

  const contractNumberValidation = {
    pattern: "^[0-9]+$",
    minLength: 1,
    maxLength: 15,
    message: "Debe ingresar un número de contrato de suministro válido."
  };

  const getServiceMessage = () => {
    switch (service) {
      case 1:
        return "Usted va a realizar el pago de Luz.";
      case 2:
        return "Usted va a realizar el pago de Agua.";
      case 3:
        return "Usted va a realizar el pago de Internet.";
      case 4:
        return "Usted va a realizar el pago de Teléfono.";
      default:
        return "";
    }
  };

  const handleBack = () => {
    setIsSelecter(false);
    setService(null);
    setContractNumber("");
    setSuccess(false);
    setPaymentData(null);
    setErrorMessage("");
  };

  const handleSubmit = async () => {
    const contractNumberWithSuffix = contractNumber + '_' + getServiceSuffix();
    console.log("Número de contrato con sufijo:", contractNumberWithSuffix);

    if (!contractNumberWithSuffix.match(/^\d+(_[0-3])?$/)) {
      alert("Debe ingresar un número de contrato válido.");
      return;
    }

    try {
      console.log("Llamando a searchPaymentAcount con número de contrato:", contractNumberWithSuffix);
      const response = await searchPaymentAcount(contractNumberWithSuffix);
      console.log("Respuesta recibida:", response);

      if (response && typeof response === 'object' && !Array.isArray(response)) {
        const data = response;

        console.log("Datos de la factura:", data);

        setPaymentData({
          name: data.name,
          amount: parseFloat(data.amount).toFixed(2), // Redondear el monto a dos decimales
          expired_date: data.expired_date,
          start_date: data.start_date,
        });
        setSuccess(true);
        setShowAccountSelection(true);
      } else {
        throw new Error("No se encontraron datos para el número de contrato proporcionado.");
      }
    } catch (error) {
      console.error("Error al obtener datos:", error);
      alert("Ocurrió un error al obtener los datos: " + error.message);
      setSuccess(false);
      setPaymentData(null);
    }
  };

  const handleAccountSelection = (e) => {
    setSelectedAccount(e.target.value);
  };

  const handlePayment = () => {
    if (!selectedAccount) {
      alert("Por favor, seleccione una cuenta para realizar el pago.");
      return;
    }
    setShowConfirmPopup(true);
  };

  const handleConfirmPayment = async () => {
    setShowConfirmPopup(false);
    const transferData = {
      contract: parseInt(contractNumber),
      parameter: getServiceSuffix(),
      account: parseInt(selectedAccount)
    };
    console.log("Transfer data before sending:", transferData);
    const response = await sendTransferServiceData(transferData);
    if(response.success){
      console.log("Transferencia exitosa", response.data);
      if(response.data.code === "PAY_TAX_SUCCESFUL"){
        setSuccess(true);
        setBeneficiary(paymentData.name); // Configurar beneficiario
        setAccountNumber(selectedAccount); // Configurar cuenta de destino
        setDescription("Pago de servicio"); // Configurar descripción
        setShowSuccessPopup(true); // Mostrar pop-up de éxito
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
          setErrorMessage("Error al obtener las cuentas del cliente");
        }
      } else {
        console.error("Error al realizar la transferencia:", response.error);
        alert(
          "Ocurrió un error al realizar la transferencia, inténtelo más tarde"
        );
      }
    }
  };

  const handleCloseSuccessPopup = () => {
    setShowSuccessPopup(false);
    navigate("/dashboard");
  };

  return (
    <div className="payments">
      <aside className="sidebar">
        <DashboardForm />
      </aside>
      <main className="main-content">
        <HeaderDashboard />
        <h1>Pago de servicios</h1>
        {!isSelecter ? (
          <div className="payments-services">
            <button className="service-button" onClick={() => handleButtonClick(1)}>
              <img src="/src/assets/services/luz.png" alt="Luz" className="service-icon" />
              <span>Luz</span>
            </button>
            <button className="service-button" onClick={() => handleButtonClick(2)}>
              <img src="/src/assets/services/agua.png" alt="Agua" className="service-icon" />
              <span>Agua</span>
            </button>
            <button className="service-button" onClick={() => handleButtonClick(3)}>
              <img src="/src/assets/services/wifi.png" alt="Internet" className="service-icon" />
              <span>Internet</span>
            </button>
            <button className="service-button" onClick={() => handleButtonClick(4)}>
              <img src="/src/assets/services/telefono.png" alt="Teléfono" className="service-icon" />
              <span>Teléfono</span>
            </button>
          </div>
        ) : (
          !success ? (
            <div>
              <p>{getServiceMessage()}</p>
              <p>Ingrese el número de suministro a pagar.</p>
              <InputGroup
                id="contractNumber"
                name="contractNumber"
                label="Número de contrato"
                type="text"
                value={contractNumber}
                onChange={(e) => setContractNumber(e.target.value)}
                validation={contractNumberValidation}
                required
              />
              <button onClick={handleBack}>Atras</button>
              <button onClick={handleSubmit}>Continuar</button>
            </div>
          ) : (
            <div className="invoice-data">
              <p>Datos de la factura:</p>
              <p>Propietario del servicio: {paymentData.name}</p>
              <p>Monto a pagar: ${paymentData.amount}</p>
              <p>Fecha de vencimiento: {paymentData.expired_date}</p>

              {showAccountSelection && (
                <div>
                  <p>Seleccione la cuenta desde la cual desea realizar el pago:</p>
                  <select
                    value={selectedAccount}
                    onChange={handleAccountSelection}
                  >
                    <option value="">Seleccione una cuenta</option>
                    {userAccounts.map((account) => (
                      <option key={account.id} value={account.number}>
                        {account.number} - Saldo: ${account.balance}
                      </option>
                    ))}
                  </select>
                </div>
              )}

              <div className="button-group">
                <button onClick={handleBack}>Atras</button>
                {showAccountSelection && (
                  <button onClick={handlePayment}>Realizar pago</button>
                )}
              </div>
            </div>
          )
        )}
      </main>
      {showConfirmPopup && (
        <div className="popup-overlay">
          <div className="confirm-popup">
            <h2>Confirmar Pago</h2>
            <p>¿Está seguro que desea realizar el pago al número de contrato {contractNumber}?</p>
            <div className="popup-button-container">
              <button onClick={handleConfirmPayment}>Aceptar</button>
              <button onClick={() => setShowConfirmPopup(false)}>Cancelar</button>
            </div>
          </div>
        </div>
      )}

      {showSuccessPopup && (
        <div className="popup-overlay">
          <div className="success-popup">
            <h1>Transferencia realizada con éxito</h1>
            <p>Desde cuenta: {selectedAccount}</p>
            <p>Hacia cuenta: {accountNumber}</p>
            <p>Beneficiario: {beneficiary}</p>
            <p>Monto transferido: ${paymentData.amount}</p>
            {description && <p>Descripción: {description}</p>}
            <button onClick={handleCloseSuccessPopup}>Ir a mis cuentas</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Payments;
