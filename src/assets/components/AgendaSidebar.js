import React, { useState, useMemo } from 'react';

const AgendaSidebar = ({ eintraege, isOpen, onToggle }) => {
  const [filterDays, setFilterDays] = useState(7); // Standard: nächste 7 Tage

  // Agenda-Daten vorbereiten
  const agendaItems = useMemo(() => {
    const items = [];
    const heute = new Date();
    heute.setHours(0, 0, 0, 0); // Setze auf Mitternacht für saubere Vergleiche
    
    const maxDate = new Date(heute);
    maxDate.setDate(heute.getDate() + filterDays);

    eintraege.forEach(eintrag => {
      const formData = eintrag.formData;
      
      // Bewerbungstermine - nur wenn erschienen LEER ist
      if (formData.datumTermin && formData.uhrzeitTermin && !formData.erschienen) {
        const [year, month, day] = formData.datumTermin.split('-').map(Number);
        const terminDate = new Date(year, month - 1, day);
        
        if (terminDate >= heute && terminDate <= maxDate) {
          items.push({
            datum: formData.datumTermin,
            uhrzeit: formData.uhrzeitTermin, // <-- Korrigiert: uhrzeitTermin statt uhrzeit
            typ: 'Bewerbung',
            name: `${formData.vorname || ''} ${formData.nachname || ''}`.trim(),
            filiale: formData.filiale,
            step: eintrag.step,
            id: eintrag.id
          });
        }
      }

      // Infotage - nur wenn erschienen = "Ja"
      if (formData.erschienen === 'Ja' && formData.infotag && formData.uhrzeit) {
        const [year, month, day] = formData.infotag.split('-').map(Number);
        const infotagDate = new Date(year, month - 1, day);
        
        if (infotagDate >= heute && infotagDate <= maxDate) {
          items.push({
            datum: formData.infotag,
            uhrzeit: formData.uhrzeit,
            typ: 'Infotag',
            name: `${formData.vorname || ''} ${formData.nachname || ''}`.trim(),
            filiale: formData.filiale,
            step: eintrag.step,
            id: eintrag.id
          });
        }
      }
    });

    // Nach Datum und Uhrzeit sortieren
    return items.sort((a, b) => {
      const dateCompare = new Date(a.datum) - new Date(b.datum);
      if (dateCompare === 0) {
        return a.uhrzeit.localeCompare(b.uhrzeit);
      }
      return dateCompare;
    });
  }, [eintraege, filterDays]);

  // Gruppierung nach Datum
  const groupedItems = useMemo(() => {
    const groups = {};
    agendaItems.forEach(item => {
      const dateKey = item.datum;
      if (!groups[dateKey]) {
        groups[dateKey] = [];
      }
      groups[dateKey].push(item);
    });
    return groups;
  }, [agendaItems]);

  // Datum formatieren
  const formatDate = (dateStr) => {
    const [year, month, day] = dateStr.split('-').map(Number);
    const date = new Date(year, month - 1, day);
    const heute = new Date();
    heute.setHours(0, 0, 0, 0);
    const morgen = new Date(heute);
    morgen.setDate(heute.getDate() + 1);

    if (date.getTime() === heute.getTime()) {
      return 'Heute';
    } else if (date.getTime() === morgen.getTime()) {
      return 'Morgen';
    } else {
      const weekdays = ['So', 'Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa'];
      const dayStr = day.toString().padStart(2, '0');
      const monthStr = month.toString().padStart(2, '0');
      return `${weekdays[date.getDay()]}, ${dayStr}.${monthStr}`;
    }
  };

  const formatTime = (timeStr) => {
    return timeStr.substring(0, 5); // HH:MM
  };

  return (
    <>
      {/* Toggle Button */}
      <div 
        style={{
          position: 'fixed',
          right: isOpen ? '320px' : '0px',
          top: '50%',
          transform: 'translateY(-50%)',
          zIndex: 1001,
          transition: 'right 0.3s ease',
          cursor: 'pointer'
        }}
        onClick={onToggle}
      >
        <div style={{
          backgroundColor: '#4b4c4cff',
          color: 'white',
          padding: '12px 8px',
          borderRadius: '8px 0 0 8px',
          boxShadow: '-2px 0 8px rgba(0,0,0,0.2)',
          fontSize: '14px',
          fontWeight: 'bold',
          writingMode: 'vertical-rl',
          textOrientation: 'mixed'
        }}>
            AGENDA
        </div>
      </div>

      {/* Sidebar */}
      <div style={{
        position: 'fixed',
        right: isOpen ? '0' : '-320px',
        top: '0',
        width: '320px',
        height: '100vh',
        backgroundColor: '#fff',
        boxShadow: '-4px 0 12px rgba(0,0,0,0.15)',
        zIndex: 1000,
        transition: 'right 0.3s ease',
        display: 'flex',
        flexDirection: 'column'
      }}>
        {/* Header */}
        <div style={{
          padding: '20px',
          borderBottom: '1px solid #e0e0e0',
          backgroundColor: '#f8f9fa'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
            <button 
              onClick={onToggle}
              style={{ 
                background: 'none', 
                border: 'none', 
                fontSize: '32px', 
                cursor: 'pointer',
                color: '#888',
                lineHeight: '1'
              }}
            >
              &#8250;
            </button>
          </div>
          
          {/* Filter */}
          <select 
            value={filterDays} 
            onChange={(e) => setFilterDays(parseInt(e.target.value))}
            style={{
              width: '100%',
              padding: '6px',
              borderRadius: '4px',
              border: '1px solid #ddd',
              fontSize: '0.9rem'
            }}
          >
            <option value={1}>Heute</option>
            <option value={3}>Nächste 3 Tage</option>
            <option value={7}>Nächste Woche</option>
            <option value={14}>Nächste 2 Wochen</option>
            <option value={30}>Nächster Monat</option>
          </select>
        </div>

        {/* Content */}
        <div style={{
          flex: 1,
          overflowY: 'auto',
          padding: '16px'
        }}>
          {Object.keys(groupedItems).length === 0 ? (
            <div style={{
              textAlign: 'center',
              color: '#888',
              marginTop: '40px',
              fontSize: '0.9rem'
            }}>
              Keine Termine in diesem Zeitraum
            </div>
          ) : (
            Object.keys(groupedItems).map(dateKey => (
              <div key={dateKey} style={{ marginBottom: '20px' }}>
                {/* Datum Header */}
                <div style={{
                  fontSize: '0.9rem',
                  fontWeight: 'bold',
                  color: '#4b4c4cff',
                  marginBottom: '8px',
                  paddingBottom: '4px',
                  borderBottom: '1px solid #e0e0e0'
                }}>
                  {formatDate(dateKey)}
                </div>

                {/* Termine für diesen Tag */}
                {groupedItems[dateKey].map((item, idx) => (
                  <div 
                    key={`${item.id}-${item.typ}-${idx}`}
                    style={{
                      padding: '8px 12px',
                      marginBottom: '6px',
                      backgroundColor: item.typ === 'Infotag' ? '#fff3cd' : '#d1ecf1',
                      border: `1px solid ${item.typ === 'Infotag' ? '#ffeaa7' : '#bee5eb'}`,
                      borderRadius: '6px',
                      fontSize: '0.85rem'
                    }}
                  >
                    <div style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      marginBottom: '4px'
                    }}>
                      <span style={{
                        fontSize: '0.8rem',
                        fontWeight: 'bold',
                        color: item.typ === 'Infotag' ? '#856404' : '#0c5460'
                      }}>
                        {item.typ}
                      </span>
                      <span style={{
                        fontSize: '0.9rem',
                        fontWeight: 'bold',
                        color: '#333'
                      }}>
                        {formatTime(item.uhrzeit)}
                      </span>
                    </div>
                    
                    <div style={{
                      fontWeight: '500',
                      color: '#333',
                      marginBottom: '2px'
                    }}>
                      {item.name}
                    </div>
                    
                    {item.filiale && (
                      <div style={{
                        fontSize: '0.8rem',
                        color: '#666'
                      }}>
                        {item.filiale}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ))
          )}
        </div>

        {/* Footer mit Statistik */}
        <div style={{
          padding: '12px 16px',
          borderTop: '1px solid #e0e0e0',
          backgroundColor: '#f8f9fa',
          fontSize: '0.8rem',
          color: '#666'
        }}>
          <div>Gesamt: {agendaItems.length} Termine</div>
          <div>
            Bewerbungen: {agendaItems.filter(i => i.typ === 'Bewerbung').length} | 
            Infotage: {agendaItems.filter(i => i.typ === 'Infotag').length}
          </div>
        </div>
      </div>
    </>
  );
};

export default AgendaSidebar;
