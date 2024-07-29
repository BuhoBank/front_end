import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { format, subDays, startOfMonth, endOfMonth, isWithinInterval } from 'date-fns';
import es from 'date-fns/locale/es'; // Importa el locale español si quieres que esté en español
import FilterMovements from './FilterMovements';
import '../../styles/AccountMovements.css';

function AccountMovements() {
    const { accountNumber } = useParams(); // Obtén el número de cuenta de los parámetros
    const [movements, setMovements] = useState([]);
    const [accountBalance, setAccountBalance] = useState(0);
    const [filter, setFilter] = useState('15days'); // Para los filtros de fecha, por defecto '15days'
    const [startDate, setStartDate] = useState(null); // Para el filtro personalizado
    const [endDate, setEndDate] = useState(null); // Para el filtro personalizado
    const navigate = useNavigate();

    useEffect(() => {
        const storedAccounts = JSON.parse(localStorage.getItem('accounts')) || [];
        const account = storedAccounts.find(acc => acc.account_number === parseInt(accountNumber));

        if (account) {
            setMovements(account.movements);
            setAccountBalance(account.balance);
        }
    }, [accountNumber]);

    const handleFilterChange = (newFilter, start, end) => {
        setFilter(newFilter);
        setStartDate(start);
        setEndDate(end);
    };

    const handleReturn = () => {
        navigate("/dashboard");
    };

    // Helper function to format amounts with + or -
    const formatAmount = (amount) => amount >= 0 ? `+${amount.toFixed(2)}` : `${amount.toFixed(2)}`;

    // Calculate movements with previous and current balances
    const calculateMovements = () => {
        // Filter movements based on the selected filter
        let filteredMovements = movements;

        if (filter === '15days') {
            const fifteenDaysAgo = subDays(new Date(), 15);
            filteredMovements = movements.filter(movement =>
                isWithinInterval(new Date(movement.fecha_movimiento), { start: fifteenDaysAgo, end: new Date() })
            );
        } else if (filter === 'month') {
            const start = startOfMonth(new Date());
            const end = endOfMonth(new Date());
            filteredMovements = movements.filter(movement =>
                isWithinInterval(new Date(movement.fecha_movimiento), { start, end })
            );
        } else if (filter === 'custom') {
            if (startDate && endDate) {
                filteredMovements = movements.filter(movement =>
                    isWithinInterval(new Date(movement.fecha_movimiento), { start: startDate, end: endDate })
                );
            }
        }

        // Map the filtered movements with the balance information directly from localStorage
        const results = filteredMovements.map((movement) => {
            const date = format(new Date(movement.fecha_movimiento), 'EEEE, d MMMM yyyy', { locale: es });
            const isDeposit = movement.cuenta_origen === 0; // Check if it’s a deposit

            // Determine the appropriate account info to display
            const accountInfo = isDeposit
                ? '' // No account info needed for deposits
                : movement.saldo_sale > 0 // If it’s a transfer out, show the destination account
                    ? `A la cuenta: ${movement.cuenta_destino}`
                    : `Desde la cuenta: ${movement.cuenta_origen}`; // If it’s a transfer in, show the origin account

            return {
                date,
                type: isDeposit ? 'Depósito' : 'Transferencia',
                amountIn: movement.saldo_entra,
                amountOut: movement.saldo_sale,
                previousBalance: movement.saldo_anterior,
                finalBalance: movement.saldo_resultante,
                accountInfo: accountInfo, // Show appropriate account info based on the type of movement
                entryOrExit: movement.saldo_entra > 0 ? 'Entra' : 'Sale' // Determine if it's an entry or exit
            };
        });

        return results;
    };

    const movementDetails = calculateMovements();

    return (
        <div className="movements-container">
            <h2 className="movements-header">Movimientos de Cuenta: {accountNumber}</h2>
            <div className="movements-balance">
                <span>Saldo Actual: ${accountBalance.toFixed(2)}</span>
                <div className="filter-container">
                    <FilterMovements onFilterChange={handleFilterChange} />
                </div>
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
                                    {movement.entryOrExit}: {formatAmount(movement.amountIn || -movement.amountOut)}
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
            <button onClick={handleReturn}>Volver</button>
        </div>
    );
}

export default AccountMovements;
