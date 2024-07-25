import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import '../styles/AccountMovements.css'; // Crea y ajusta la ruta si es necesario

const AccountMovements = () => {
  const { accountNumber } = useParams();
  const [movements, setMovements] = useState([]);

  useEffect(() => {
    const storedMovements = JSON.parse(localStorage.getItem('movements'));
    if (storedMovements) {
      const accountMovements = storedMovements.filter(movement => movement.account_number === accountNumber);
      setMovements(accountMovements);
    }
  }, [accountNumber]);

  return (
    <div className="movements-container">
      <h2>Movimientos de la cuenta {accountNumber}</h2>
      <ul>
        {movements.map(movement => (
          <li key={movement.id} className="movement-item">
            <span>{movement.date}</span>
            <span>{movement.description}</span>
            <span>${movement.amount}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AccountMovements;
