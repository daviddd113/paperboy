import React from 'react';

const stepColors = ['#2684ff', '#f3581bff', '#d09434', '#a259e6'];

// Hilfsfunktion für Datumsformatierung
function formatDate(dateStr) {
  if (!dateStr) return '';
  const d = new Date(dateStr);
  if (isNaN(d)) return '';
  const day = String(d.getDate()).padStart(2, '0');
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const year = String(d.getFullYear()).slice(-2);
  return `${day}.${month}.${year}`;
}

// Hilfsfunktion für Terminformatierung
function formatTermin(dateStr, timeStr) {
  if (!dateStr) return '';
  const d = new Date(dateStr);
  if (isNaN(d)) return '';
  const day = String(d.getDate()).padStart(2, '0');
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const year = d.getFullYear();
  
  const timeFormatted = timeStr || '';
  return `${day}.${month}.${year} ${timeFormatted}`.trim();
}

const BewerberTabelle = ({ eintraege, selectedId, onSelect }) => {
  return (
    <div className="p-8 BewerberTabelle" style={{ maxWidth: '900px', margin: '0 auto' }}>
      <table className="w-full text-sm">
        <thead className="text-left border-b border-gray-300">
          <tr>
            <th style={{width: 50}}></th>
            <th style={{width: 60, fontSize: '0.95rem'}}>Filiale</th>
            <th style={{width: 60, fontSize: '0.95rem'}}>Name</th>
            <th style={{width: 100, fontSize: '0.95rem'}}>Kontakt</th>
            <th style={{fontSize: '0.95rem'}}>Termin</th>
          </tr>
        </thead>
        <tbody>
          {eintraege.length === 0 ? (
            <tr><td colSpan={5} style={{textAlign:'center', color:'#bbb', padding:'32px 0', fontSize:'0.95rem'}}>Keine Einträge gefunden</td></tr>
          ) : eintraege.map((eintrag, idx) => (
            <tr
              key={eintrag.id}
              onClick={() => onSelect(eintrag.id)}
              className={selectedId === eintrag.id ? 'selected' : ''}
              style={{
                cursor: 'pointer',
                transition: 'background 0.2s'
              }}
            >
              <td style={{width:30}}>
                <span className="step-circle-mini" style={{
                  background: (() => {
                    const step = eintrag.step || 1;
                    // Grau für Step 4 wenn die Bewerbung abgebrochen wurde (Grund vorhanden)
                    if (step === 4 && (eintrag.grund || eintrag.grundTermin)) {
                      return '#888';
                    }
                    // Normale Farben für alle anderen Fälle
                    return stepColors[step - 1];
                  })(),
                  color: '#fff',
                  border: `2px solid ${(() => {
                    const step = eintrag.step || 1;
                    // Grauer Border für abgebrochene Step 4
                    if (step === 4 && (eintrag.grund || eintrag.grundTermin)) {
                      return '#888';
                    }
                    // Normale Border-Farben
                    return stepColors[step - 1];
                  })()}`,
                  width: 28,
                  height: 28,
                  fontSize: '1.15rem',
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>{eintrag.step || 1}</span>
              </td>
              <td style={{width:80}}>{eintrag.filiale || ''}</td>
              <td style={{width:60}}>{eintrag.name || ''}</td>
              <td className="py-2">{formatDate(eintrag.kontaktdatum)}</td>
              <td className="py-2">{formatTermin(eintrag.datum, eintrag.uhrzeit)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BewerberTabelle;
