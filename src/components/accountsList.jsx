import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/AccountInfo.css';

function AccountInfo() {
    const [accounts, setAccounts] = useState([]);
    const navigate = useNavigate(); 

    useEffect(() => {
        const storedAccounts = JSON.parse(localStorage.getItem('accounts')) || [];
        setAccounts(storedAccounts);
    }, []);

    const showMovements = (accountNumber) => {
        navigate(`/account-movements/${accountNumber}`); 
    }

    return (
        <div className="account-container">
            <h2 className="account-header">Lista de Cuentas:</h2>
            <ul className="account-list">
                {accounts.map(account => (
                    <li 
                        key={account.account_number} 
                        className="account-item" 
                        onClick={() => showMovements(account.account_number)}
                    >
                        <span className="account-number">Número de cuenta: {account.account_number}</span>
                        <span className="account-balance">Saldo: ${account.balance.toFixed(2)}</span>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default AccountInfo;
