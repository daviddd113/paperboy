import React from 'react';

const stepColors = ['#2684ff', '#f3581bff', '#d09434', '#a259e6'];

const BewerberTabelle = ({ eintraege, selectedId, onSelect }) => {
  return (
    <div className="p-4 BewerberTabelle">
      <table className="w-full text-sm">
        <thead className="text-left border-b border-gray-300">
          <tr>
            <th style={{width: 40}}></th>
            <th style={{width: 60, fontSize: '0.95rem'}}>Filiale</th>
            <th style={{width: 135, fontSize: '0.95rem'}}>Name</th>
            <th style={{width: 80, fontSize: '0.95rem'}}>Datum</th>
            <th style={{fontSize: '0.95rem'}}>Uhrzeit</th>
          </tr>
        </thead>
        <tbody>
          {eintraege.length === 0 ? (
            <tr><td colSpan={5} style={{textAlign:'center', color:'#bbb', padding:'32px 0', fontSize:'0.95rem'}}>Keine Einträge</td></tr>
          ) : eintraege.map((eintrag, idx) => (
            <tr
              key={eintrag.id}
              onClick={() => onSelect(eintrag.id)}
              style={{
                backgroundColor: selectedId === eintrag.id ? '#e6f2ff' : 'transparent',
                cursor: 'pointer',
                transition: 'background 0.2s',
                fontWeight: 'normal',
                color: '#222'
              }}
            >
              <td style={{width:40}}>
                <span className="step-circle-mini" style={{
                  background: stepColors[(eintrag.step || 1) - 1],
                  color: '#fff',
                  border: `2px solid ${stepColors[(eintrag.step || 1) - 1]}`,
                  width: 28,
                  height: 28,
                  fontSize: '1.15rem',
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>{eintrag.step || 1}</span>
              </td>
              <td style={{width:80}}>{eintrag.filiale || ''}</td>
              <td className="py-2">{eintrag.name || ''}</td>
              <td className="py-2">{eintrag.datum || ''}</td>
              <td className="py-2">{eintrag.uhrzeit || ''}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BewerberTabelle;
