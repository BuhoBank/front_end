import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [accounts, setAccounts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // const isLoggedIn = localStorage.getItem("isLoggedIn");
    // if (!isLoggedIn) {
    //   navigate("/login");
    //   return;
    // }

    const storedAccounts = localStorage.getItem("accounts");
    if (storedAccounts) {
      setAccounts(JSON.parse(storedAccounts));
    }
  }, [navigate]);

  return (
    <div className="dashboard-container">
      <h1>Dashboard</h1>
      <h2>Tus cuentas:</h2>
      <ul>
        {accounts.map((account, index) => (
          <li key={index}>{account}</li>
        ))}
      </ul>
    </div>
  );
};

export default Dashboard;
