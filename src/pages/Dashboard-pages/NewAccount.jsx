import React from "react";
import { useNavigate } from "react-router-dom";
import Navigate from "../../components/navigate";
import NewAccountForm from "../../components/newAccountForm";
import "../../styles/Dashboard-newaccount.css";

const NewAccount = () => {
  const navigate = useNavigate();

  return (
    <div className="new-account">
      <aside className="sidebar">
        <Navigate />
      </aside>
      <main className="main-content">
        <h1>Solicitar Nueva Cuenta</h1>
        <NewAccountForm />
      </main>
    </div>
  );
};

export default NewAccount;
