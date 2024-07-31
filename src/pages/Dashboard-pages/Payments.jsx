import React from "react";
import { useNavigate } from "react-router-dom";
import Navigate from "../../components/navigate";
import "../../styles/Dashboard-payments.css";

const Payments = () => {
  const navigate = useNavigate();

  return (
    <div className="payments">
      <aside className="sidebar">
        <Navigate />
      </aside>
      <main className="main-content">
        <h1>Pagos</h1>
        <form>
          <div className="form-group">
            {<label htmlFor="billNumber"></label>}
            <input type="text" id="billNumber" required />
          </div>
          <div className="form-group">
            <label htmlFor="amount"></label>
            <input type="number" id="amount" required />
          </div>
          <button type="submit">Pagar</button>
        </form>
      </main>
    </div>
  );
};

export default Payments;
