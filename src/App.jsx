
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./styles/Login.css";
import "./styles/Register.css";
import "./styles/Dashboard.css";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Contacts from "./pages/Dashboard-pages/Contacts";
import NewAccount from "./pages/Dashboard-pages/NewAccount";
import Others from "./pages/Dashboard-pages/Others";
import Payments from "./pages/Dashboard-pages/Payments";
import Profile from "./pages/Dashboard-pages/Profile";
import Transfer from "./pages/Dashboard-pages/Transfer";
import RecoverPasswordPage from "./pages/RecoverPasswordPage";
import AccountMovements from "./components/movements/movements";
import RecoverNameUser from "./components/recoverNameUser/RecoverNameUser";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/dashboard-contacts" element={<Contacts />} />
        <Route path="/dashboard-newaccount" element={<NewAccount />} />
        <Route path="/dashboard-others" element={<Others />} />
        <Route path="/dashboard-payments" element={<Payments />} />
        <Route path="/dashboard-profile" element={<Profile />} />
        <Route path="/dashboard-transfer" element={<Transfer />} />
        <Route path="/recuperar_contrasena" element={<RecoverPasswordPage />} />
        <Route path="/account-movements/:accountNumber" element={<AccountMovements />} />
        <Route path="/recuperar_nombre_usuario" element={<RecoverNameUser />} />
      </Routes>
    </Router>
  );
}
export default App;
