import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

function FilterMovements({ onFilterChange }) {
    const [filter, setFilter] = useState('15days');
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);

    const handleFilterChange = (newFilter) => {
        setFilter(newFilter);
        if (newFilter !== 'custom') {
            onFilterChange(newFilter, null, null);
        }
    };

    const handleCustomFilterChange = () => {
        // Pasar endDate + 1 día al onFilterChange
        if (endDate) {
            const adjustedEndDate = new Date(endDate);
            adjustedEndDate.setDate(adjustedEndDate.getDate() + 1);
            onFilterChange('custom', startDate, adjustedEndDate);
        } else {
            onFilterChange('custom', startDate, endDate);
        }
    };

    const handleClearFilters = () => {
        setStartDate(null);
        setEndDate(null);
        onFilterChange(filter, null, null); // Reinicia los filtros al estado original
    };

    return (
        <div className="filter-container">
          <div className="filter-buttons">
            <button onClick={() => handleFilterChange('15days')}>Últimos 15 días</button>
            <button onClick={() => handleFilterChange('month')}>Último mes</button>
            <button onClick={() => handleFilterChange('custom')}>Personalizar</button>

          </div>
          {filter === 'custom' && (
            <div className="custom-filter">
              <DatePicker
                selected={startDate}
                onChange={date => setStartDate(date)}
                dateFormat="yyyy/MM/dd"
                
                placeholderText="Desde:"
                className="date-input"
              />
              <DatePicker
                selected={endDate}
                onChange={date => {
                  if (date) {
                    const adjustedDate = new Date(date);
                    adjustedDate.setDate(adjustedDate.getDate());
                    setEndDate(adjustedDate);
                  }
                }}
                dateFormat="yyyy/MM/dd"
                placeholderText="Hasta:"
                className="date-input"
              />
              <button onClick={handleCustomFilterChange}>Aplicar</button>
              <button onClick={handleClearFilters} className="clear-button">Limpiar</button>
            </div>
          )}
          <div className="active-filter">
            <span>Filtro aplicado: {filter === '15days' ? 'Últimos 15 días' : filter === 'month' ? 'Último mes' : 'Personalizado'}</span>
          </div>
        </div>
      );
}

export default FilterMovements;
