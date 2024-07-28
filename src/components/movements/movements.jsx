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

    // Helper function to format amounts with + or -
    const formatAmount = (amount) => amount >= 0 ? `+${amount.toFixed(2)}` : `${amount.toFixed(2)}`;

    // Calculate movements with previous and current balances
    const calculateMovements = () => {
        let previousBalance = 0; // Start with 0 for the first movement
        let finalBalance = 0; // To keep track of the final balance, start with 0

        // Calculate the final balance by iterating over the movements
        movements.forEach(movement => {
            const amountIn = movement.saldo_entra;
            const amountOut = movement.saldo_sale;
            finalBalance += amountIn - amountOut;
        });

        // Calculate movements details with updated balance values
        return movements.map((movement, index) => {
            const amountIn = movement.saldo_entra;
            const amountOut = movement.saldo_sale;
            const date = format(new Date(movement.fecha_movimiento), 'EEEE, d MMMM yyyy', { locale: es });
            const isDeposit = movement.cuenta_origen === 0; // Check if it’s a deposit
            const isTransfer = amountIn > 0; // Check if it’s a transfer based on the amount

            const currentMovementFinalBalance = previousBalance + amountIn - amountOut;

            // Determine the appropriate account info to display
            const accountInfo = isDeposit
                ? '' // No account info needed for deposits
                : amountOut > 0 // If it’s a transfer out, show the destination account
                ? `A la cuenta: ${movement.cuenta_destino}`
                : `Desde la cuenta: ${movement.cuenta_origen}`; // If it’s a transfer in, show the origin account

            const result = {
                date,
                type: isDeposit ? 'Depósito' : 'Transferencia',
                amountIn,
                amountOut,
                previousBalance,
                finalBalance: currentMovementFinalBalance,
                accountInfo: accountInfo, // Show appropriate account info based on the type of movement
            };

            // Update previous balance for the next iteration
            previousBalance = currentMovementFinalBalance;

            return result;
        });
    };

    // Ensure that the last movement's final balance matches the account balance
    const movementDetails = calculateMovements();
    if (movementDetails.length > 0) {
        movementDetails[movementDetails.length - 1].finalBalance = accountBalance;
    }

    return (
        <div className="movements-container">
            <h2 className="movements-header">Movimientos de Cuenta: {accountNumber}</h2>
            <div className="movements-balance">
                <span>Saldo Actual: ${accountBalance.toFixed(2)}</span>
            </div>
            <ul className="movements-list">
                {movementDetails.map((movement, index) => (
                    <li
                        key={index}
                        className={`movement-item ${movement.amountIn > 0 ? 'entry' : 'exit'}`}
                    >
                        <div className="movement-date">
                            {movement.date}
                        </div>
                        <div className="movement-details">
                            <span className="movement-type">
                                Tipo de movimiento: {movement.type}
                            </span>
                            <div className="movement-amount">
                                <span className={movement.amountIn > 0 ? 'amount-entry' : 'amount-exit'}>
                                    {movement.type === 'Depósito' ? 'Entrada' : 'Salida'}: {formatAmount(movement.amountIn || -movement.amountOut)}
                                </span>
                            </div>
                            <div className="movement-balance">
                                <span>Saldo anterior: ${movement.previousBalance.toFixed(2)}</span>
                            </div>
                            <div className="movement-final-balance">
                                <span>Saldo posterior: ${movement.finalBalance.toFixed(2)}</span>
                            </div>
                            {movement.accountInfo && (
                                <div className="account-info">
                                    {movement.accountInfo}
                                </div>
                            )}
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default AccountMovements;
