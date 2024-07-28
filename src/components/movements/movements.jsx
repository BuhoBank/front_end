import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { format } from 'date-fns';
import es from 'date-fns/locale/es'; // Importa el locale español si quieres que esté en español
import '../../styles/AccountMovements.css';

function AccountMovements() {
    const { accountNumber } = useParams(); // Obtén el número de cuenta de los parámetros
    const [movements, setMovements] = useState([]);
    const [accountBalance, setAccountBalance] = useState(0);

    useEffect(() => {
        const storedAccounts = JSON.parse(localStorage.getItem('accounts')) || [];
        const account = storedAccounts.find(acc => acc.account_number === parseInt(accountNumber));

        if (account) {
            setMovements(account.movements);
            setAccountBalance(account.balance);
        }
    }, [accountNumber]);

    return (
        <div className="movements-container">
            <h2 className="movements-header">Movimientos de Cuenta: {accountNumber}</h2>
            <div className="movements-balance">
                <span>Saldo Actual: ${accountBalance.toFixed(2)}</span>
            </div>
            <ul className="movements-list">
                {movements.map((movement, index) => (
                    <li key={index} className="movement-item">
                        <div className="movement-date">
                            {format(new Date(movement.fecha_movimiento), 'EEEE, d MMMM yyyy', { locale: es })}
                        </div>
                        <div className="movement-details">
                            <span className="movement-amount">
                                Entrada: ${movement.saldo_entra.toFixed(2)}
                            </span>
                            <span className="movement-amount">
                                Salida: ${movement.saldo_sale.toFixed(2)}
                            </span>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default AccountMovements;