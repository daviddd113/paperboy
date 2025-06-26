import React, { useState } from 'react';
import { format } from 'date-fns';
import { useRef, useEffect } from 'react';

const HeaderBar = ({ count, onNeu }) => {
  const [filterTypes, setFilterTypes] = useState([
    'status', '', '', ''
  ]);
  const [filterValues, setFilterValues] = useState(['Offen', '', '', '']);

  // Verfügbare Typen für jede Box (bereits gewählte Typen deaktivieren)
  function getAvailableTypes(idx) {
    return filterOptions.map(opt => ({
      ...opt,
      disabled: filterTypes.includes(opt.value) && filterTypes[idx] !== opt.value
    }));
  }

  function handleTypeChange(idx, value) {
    const newTypes = [...filterTypes];
    newTypes[idx] = value;
    setFilterTypes(newTypes);
    // Reset value if type changes
    const newVals = [...filterValues];
    newVals[idx] = '';
    setFilterValues(newVals);
  }

  function handleValueChange(idx, value) {
    const newVals = [...filterValues];
    newVals[idx] = value;
    setFilterValues(newVals);
  }

  function DateRangePickerBox({ idx, filterValues, handleValueChange }) {
    const [showPicker, setShowPicker] = useState(true);
    const pickerRef = useRef(null);
    useEffect(() => {
      function handleClickOutside(event) {
        if (pickerRef.current && !pickerRef.current.contains(event.target)) {
          setShowPicker(false);
        }
      }
      if (showPicker) {
        document.addEventListener('mousedown', handleClickOutside);
      } else {
        document.removeEventListener('mousedown', handleClickOutside);
      }
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [showPicker]);
    if (!showPicker) return null;
    return (
      <div
        ref={pickerRef}
        style={{
          border: '1px solid #bfc4c9',
          borderRadius: 6,
          padding: '8px 10px',
          marginTop: 8,
          display: 'flex',
          alignItems: 'center',
          gap: 8,
          background: '#fff',
          flexDirection: 'row',
          width: 'max-content',
          position: 'absolute',
          zIndex: 10
        }}
      >
        <label style={{fontSize:'0.8em',color:'#888',marginRight:2}}>Von</label>
        <input
          className="input no-border"
          type="date"
          style={{width:'90px'}}
          value={filterValues[idx + '_von'] || ''}
          onChange={e => {
            const von = e.target.value;
            const bis = (filterValues[idx + '_bis'] || '');
            if (von && bis) {
              const vonStr = format(new Date(von), 'dd.MM.yyyy');
              const bisStr = format(new Date(bis), 'dd.MM.yyyy');
              handleValueChange(idx, vonStr + ' - ' + bisStr);
            } else {
              handleValueChange(idx, 'Freie Auswahl');
              handleValueChange(idx + '_von', von);
            }
          }}
        />
        <label style={{fontSize:'0.8em',color:'#888',margin:'0 2px 0 6px'}}>Bis</label>
        <input
          className="input no-border"
          type="date"
          style={{width:'90px'}}
          value={filterValues[idx + '_bis'] || ''}
          onChange={e => {
            const bis = e.target.value;
            const von = (filterValues[idx + '_von'] || '');
            if (von && bis) {
              const vonStr = format(new Date(von), 'dd.MM.yyyy');
              const bisStr = format(new Date(bis), 'dd.MM.yyyy');
              handleValueChange(idx, vonStr + ' - ' + bisStr);
            } else {
              handleValueChange(idx, 'Freie Auswahl');
              handleValueChange(idx + '_bis', bis);
            }
          }}
        />
      </div>
    );
  }

  function renderValueDropdown(type, idx) {
    if (!type) return (
      <select className="input no-border" disabled style={{width: '150px'}}><option value=""></option></select>
    );
    if (type === 'status') {
      return (
        <select className="input no-border" value={filterValues[idx] || (idx === 0 ? 'Offen' : '')} onChange={e => handleValueChange(idx, e.target.value)} style={{width: '150px'}}>
          <option value=""></option>
          {statusOptions.map(opt => <option key={opt}>{opt}</option>)}
        </select>
      );
    }
    if (type === 'datum' || type === 'termin') {
      const dateOptions = ['Heute', 'Morgen', 'Diese Woche', 'Freie Auswahl'];
      const isRange = filterValues[idx] && filterValues[idx].includes(' - ');
      let dropdownValue = filterValues[idx];
      if (isRange) dropdownValue = filterValues[idx];
      else if (filterValues[idx] === 'Freie Auswahl') dropdownValue = 'Freie Auswahl';
      else dropdownValue = filterValues[idx];
      return (
        <div style={{width: 150, position: 'relative'}}>
          <select
            className="input no-border"
            value={isRange ? '' : filterValues[idx]}
            onChange={e => {
              if (e.target.value === '') {
                handleValueChange(idx, '');
                handleValueChange(idx + '_von', '');
                handleValueChange(idx + '_bis', '');
              } else if (e.target.value === 'Freie Auswahl') {
                handleValueChange(idx, 'Freie Auswahl');
              } else {
                handleValueChange(idx, e.target.value);
              }
            }}
            style={{width: '100%'}}
          >
            <option value=""></option>
            {dateOptions.map(opt => (
              <option key={opt} value={opt}>{opt}</option>
            ))}
          </select>
          {isRange && (
            <div style={{
              position: 'absolute',
              left: 0,
              top: 0,
              width: '100%',
              height: '100%',
              display: 'flex',
              alignItems: 'center',
              pointerEvents: 'none',
              background: 'transparent',
              fontSize: '0.75em',
              color: '#222',
              paddingLeft: 8
            }}>
              {filterValues[idx]}
            </div>
          )}
          {(filterValues[idx] === 'Freie Auswahl' && !isRange) && (
            <DateRangePickerBox idx={idx} filterValues={filterValues} handleValueChange={handleValueChange} />
          )}
        </div>
      );
    }
    if (type === 'filiale') {
      return (
        <select className="input no-border" value={filterValues[idx]} onChange={e => handleValueChange(idx, e.target.value)} style={{width: '150px'}}>
          <option value=""></option>
          {filialeOptions.map(f => <option key={f}>{f}</option>)}
        </select>
      );
    }
    return null;
  }

  return (
    <header className="header-bar">
      <div className="header-bar-top">
        <div className="header-bar-logo-title">
          <div>
            <div className="header-bar-title">Qualitäts Management System</div>
            <div className="header-bar-sub">BEWERBUNGEN</div>
          </div>
        </div>
        <div className="header-bar-actions">
          <button onClick={onNeu}>NEU</button>
          <button>IMPORTIEREN</button>
          <button>EXPORTIEREN</button>
          <button>DRUCKEN</button>
          <button>SUCHEN</button>
        </div>
      </div>
      <div className="header-bar-filter">
        <div className="header-bar-filter-info">
          <div className="header-bar-filter-info-title">BEWERBUNGEN</div>
          <div className="header-bar-filter-info-count">Ergebnis: {count}</div>
        </div>
        {[0,1,2,3].map(idx => (
          <div className="filter-box" key={idx}>
            <select
              className="filter-dropdown no-border"
              value={filterTypes[idx]}
              onChange={e => handleTypeChange(idx, e.target.value)}
              style={{width: '150px'}}
            >
              <option value=""></option>
              {getAvailableTypes(idx).map(opt => (
                <option key={opt.value} value={opt.value} disabled={opt.disabled}>{opt.label}</option>
              ))}
            </select>
            {renderValueDropdown(filterTypes[idx], idx)}
          </div>
        ))}
      </div>
    </header>
  );
}

const filterOptions = [
  { label: 'Status', value: 'status' },
  { label: 'Datum', value: 'datum' },
  { label: 'Termin/Infotag', value: 'termin' },
  { label: 'Filiale', value: 'filiale' },
];
const statusOptions = ['Offen', 'Status 1', 'Status 2', 'Status 3', 'Status 4'];
const filialeOptions = ['Filiale 1', 'Filiale 2', 'Filiale 3', 'Filiale 5', 'Filiale 6', 'Filiale 7', 'Filiale 8', 'Filiale 9', 'Filiale 10','Filiale 13', 'Filiale 15', ];

export default HeaderBar;
