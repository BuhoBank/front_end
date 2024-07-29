import React, { useState } from "react";
import useNewAccountForm from "../hooks/useNewAccountForm";
import { Navigate, useNavigate } from "react-router-dom";
import "../styles/TermDialog.css";

const TermsDialog = ({ onClose }) => {
  // const { error, handleNewAccountSubmit } = useNewAccountForm();
  const {
    error,
    handleNewAccountSubmit,
    showSuccessPopup,
    setShowSuccessPopup,
  } = useNewAccountForm();
  const [accountNumber,setAccountNumber]=useState(null)
  // const handleAccept = () => {
  //   // Obtener el ID del cliente desde localStorage
  //   const clientID = localStorage.getItem('clientID');
  //   setIsAceer(true)
  //   if (!clientID) {
  //     console.error("No se encontró el ID del cliente en el localStorage");
  //     return;
  //   }

  //   handleNewAccountSubmit(clientID);
  // };

  const navigate=useNavigate()

  const handleAccept = async () => {
    // Obtener el ID del cliente desde localStorage
    const clientID = localStorage.getItem("clientID");
    if (!clientID) {
      console.error("No se encontró el ID del cliente en el localStorage");
      return;
    }

    try {
      await handleNewAccountSubmit(clientID); // Llamar a la función asincrónica
      const account=localStorage.getItem('new_account');
      const parseAccount=JSON.parse(account)

      setAccountNumber(parseAccount)
    } catch (error) {
      setError("Error al intentar crear cuenta");
      console.error("Error durante la creación de cuenta", error);
    }
  };

  // Mostrar el mensaje emergente de éxito
  const handleCloseSuccessPopup = () => {
    navigate('/dashboard');
  };

  return (
    <div className="terms-dialog-overlay">
      <div className="terms-dialog-backdrop" onClick={onClose}></div>
      <div className="terms-dialog-content">
        <h2 className="terms-dialog-title">Términos y Condiciones</h2>
        <div className="terms-dialog-body">
          <p>
            <strong>1. Introducción</strong>
            <br />
            Al solicitar una nueva cuenta bancaria, usted acepta los términos y
            condiciones descritos en este documento. Por favor, léalos
            detenidamente antes de proceder.
          </p>
          <p>
            <strong>2. Verificación de Identidad</strong>
            <br />
            Todas las cuentas están sujetas a un proceso de verificación de
            identidad. Usted deberá proporcionar documentos válidos para
            completar este proceso.
          </p>
          <p>
            <strong>3. Cargos y Comisiones</strong>
            <br />
            Las cuentas bancarias están sujetas a cargos mensuales de
            mantenimiento y otras comisiones según se detalla en nuestra tabla
            de tarifas.
          </p>
          <p>
            <strong>4. Uso de la Cuenta</strong>
            <br />
            El uso indebido de la cuenta, incluyendo actividades ilegales o
            fraudulentas, resultará en el cierre inmediato de la misma.
          </p>
          <p>
            <strong>5. Protección de Datos</strong>
            <br />
            Nos comprometemos a proteger su privacidad y a manejar sus datos
            personales de acuerdo con nuestra política de privacidad. Sus datos
            serán utilizados exclusivamente para los fines especificados y no
            serán compartidos con terceros sin su consentimiento.
          </p>
          <p>
            <strong>6. Responsabilidades del Titular</strong>
            <br />
            Usted es responsable de mantener la confidencialidad de sus
            credenciales de acceso y de todas las actividades que se realicen
            con su cuenta.
          </p>
          <p>
            <strong>7. Modificaciones de los Términos</strong>
            <br />
            Nos reservamos el derecho de modificar estos términos y condiciones
            en cualquier momento. Los cambios serán notificados a través de
            nuestros canales oficiales.
          </p>
          <p>
            <strong>8. Contacto</strong>
            <br />
            Para cualquier consulta o asistencia, por favor, póngase en contacto
            con nuestro servicio de atención al cliente a través de [email o
            número de teléfono].
          </p>
        </div>
        <div className="terms-dialog-footer">
          <button onClick={onClose} className="terms-dialog-close-btn">
            Declinar
          </button>
          <button onClick={handleAccept} className="terms-dialog-accept-btn">
            Aceptar
          </button>
        </div>
        {/* Popup de éxito */}
        {showSuccessPopup && (
                    <div className="success-popup">
                        <h1>Cuenta creada con éxito.</h1>
                        <p> Nueva cuenta con número: {accountNumber}</p>
                        
                        <button onClick={handleCloseSuccessPopup}>Ir a mis cuentas</button>
                    </div>
                )}
      </div>
    </div>
  );
};

export default TermsDialog;
