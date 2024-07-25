import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/AccountInfo.css';

function AccountInfo() {
    const [accounts, setAccounts] = useState([]);

    useEffect(() => {
        const storedAccounts = JSON.parse(localStorage.getItem('accounts'));
        if (storedAccounts) {
            setAccounts(storedAccounts);
        }
    }, []);

    return (
        <div className="account-container">
            <h2 className="account-header">Lista de Cuentas:</h2>
            <ul>
                {accounts.map(account => (
                    <li key={account.account_number} className="account-item">
                        <Link to={`/account/${account.account_number}`}>
                            <span className="account-number">Número de cuenta: {account.account_number}</span>
                            <span className="account-balance">Saldo: ${account.balance}</span>
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default AccountInfo;
