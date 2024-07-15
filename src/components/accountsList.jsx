import React, { useEffect, useState } from 'react';
import '../styles/AccountInfo.css'; // Asegúrate de importar tu archivo CSS
function AccountInfo() {
    const [accounts, setAccounts] = useState([]);

    useEffect(() => {
        const storedAccounts = JSON.parse(localStorage.getItem('accounts'));
        console.log(storedAccounts)
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
                        <span className="account-number">Número de cuenta: {account.account_number}</span>
                        <span className="account-balance">Saldo: ${account.balance}</span>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default AccountInfo;