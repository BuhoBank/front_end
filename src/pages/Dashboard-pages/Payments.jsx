import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navigate from "../../components/navigate";
import "../../styles/Dashboard-payments.css";
import InputGroup from "../../components/InputGroup";
import DashboardForm from "../../components/DashboardForm";
import HeaderDashboard from "../../components/headerDashboard";



const Payments = () => {
  const navigate = useNavigate();
  const [isSelecter, setIsSelecter] = useState(false)
  const [service, setService] = useState(null)
  const [ci, setCi] = useState("")

  const handleButtonClick = (selectedService) => {
    setIsSelecter(true);
    setService(selectedService);
  };

  const ciValidation = {
    pattern: "\\d{10}",  // Solo dígitos numéricos de exactamente 10 dígitos
    minLength: 10,
    maxLength: 10,
    message: "Debe ingresar exactamente 10 dígitos numéricos."
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

  const handleBack =()=>{
    setIsSelecter(false)
    setService(0)
    setCi("")
  }

  const handleSubmit = () => {
    console.log("CI agregada ", ci);
    if (ci.length !== 10) {
      alert("Debe ingresar exactamente 10 dígitos numéricos");
    } else {
      // Aquí puedes manejar el caso cuando la longitud es correcta
      console.log("Número de cédula válido");
    }
  };
  return (
    <div className="payments">
      <aside className="sidebar">
        <DashboardForm />
      </aside>
      <main className="main-content">
        <HeaderDashboard />
        <h1>Pago de servicios</h1>
        {/* <form> */}
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
            <div>
              <p>{getServiceMessage()}</p>
              <p>Ingrese el número de cédula</p>
              <InputGroup
                id="ci"
                name="ci"
                label="Cédula de identidad"
                type="text"
                value={ci}
                onChange={(e) => setCi(e.target.value)}
                validation={ciValidation}
                required={true}
              />
              <button onClick={handleBack}>
                Atras
              </button>
              <button onClick={handleSubmit}>
                Continuar
              </button>
            </div>
          )}
        {/* </form> */}
      </main>
    </div>
  );
};

export default Payments;
