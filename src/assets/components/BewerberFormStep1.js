import React, { useState, useEffect } from 'react';

const GRUENDE = [
  'Kein weiteres Interesse',
  'Eine andere Tätigkeit gefunden',
  'Selbstständigkeit',
  'Gebiete passen nicht',
  'Fehlende Arbeitserlaubnis oder Dokumente',
  'Minderjährig',
  'Zu geringer Verdienst',
  'Arbeitszeit',
  'Nicht erschienen',
  'Nicht erreicht',
];

// Popup-Komponente
const StatusPopup = ({ isOpen, onCancel, onConfirm }) => {
  if (!isOpen) return null;
  
  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0,0,0,0.5)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000
    }}>
      <div style={{
        backgroundColor: 'white',
        padding: '20px',
        borderRadius: '8px',
        boxShadow: '0 2px 10px rgba(0,0,0,0.2)',
        width: '300px',
        textAlign: 'center'
      }}>
        <h3 style={{ marginBottom: '20px' }}>Status 4?</h3>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '10px' }}>
          <button 
            className="btn btn-secondary"
            onClick={onCancel}
          >
            Abbrechen
          </button>
          <button 
            className="btn btn-primary"
            onClick={onConfirm}
          >
            OK
          </button>
        </div>
      </div>
    </div>
  );
};

// Popup-Komponente für frühere Termine
const FruehereTerminePopup = ({ isOpen, onClose, termine }) => {
  if (!isOpen) return null;
  
  // Funktion zur Formatierung des Datums von JJJJ-MM-TT zu TT.MM.JJJJ
  const formatDatum = (datum) => {
    if (!datum) return '-';
    const [jahr, monat, tag] = datum.split('-');
    return `${tag}.${monat}.${jahr}`;
  };
  
  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0,0,0,0.5)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 2000
    }}>
      <div style={{
        backgroundColor: 'white',
        padding: '24px',
        borderRadius: '8px',
        boxShadow: '0 4px 20px rgba(0,0,0,0.3)',
        width: '600px',
        maxHeight: '80vh',
        overflow: 'auto'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <h3 style={{ margin: 0, color: '#444' }}>Frühere Termine ({termine.length})</h3>
          <button 
            onClick={onClose}
            style={{ 
              background: 'none', 
              border: 'none', 
              fontSize: '24px', 
              cursor: 'pointer',
              color: '#888'
            }}
          >
            ×
          </button>
        </div>
        
        {termine.length === 0 ? (
          <p style={{ textAlign: 'center', color: '#888', padding: '20px' }}>
            Keine früheren Termine vorhanden
          </p>
        ) : (
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ borderBottom: '2px solid #e0e0e0' }}>
                <th style={{ textAlign: 'left', padding: '8px', color: '#2684ff', fontSize: '0.9rem', fontWeight: 600 }}>DATUM</th>
                <th style={{ textAlign: 'left', padding: '8px', color: '#2684ff', fontSize: '0.9rem', fontWeight: 600 }}>UHRZEIT</th>
                <th style={{ textAlign: 'left', padding: '8px', color: '#2684ff', fontSize: '0.9rem', fontWeight: 600 }}>ERSCHIENEN</th>
              </tr>
            </thead>
            <tbody>
              {termine.map((termin, idx) => (
                <tr key={termin.id || idx} style={{ borderBottom: '1px solid #f0f0f0' }}>
                  <td style={{ padding: '8px', fontSize: '0.85rem' }}>{formatDatum(termin.datum)}</td>
                  <td style={{ padding: '8px', fontSize: '0.85rem' }}>{termin.uhrzeit}</td>
                  <td style={{ padding: '8px', fontSize: '0.85rem', color: termin.erschienen === 'Nein' ? '#d00' : '#444' }}>{termin.erschienen}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
        
        <div style={{ marginTop: '20px', textAlign: 'right' }}>
          <button 
            className="btn btn-secondary"
            onClick={onClose}
          >
            Schließen
          </button>
        </div>
      </div>
    </div>
  );
};

const BewerberFormStep1 = ({ formData, handleChange, onChangeStep, currentStep }) => {
  const [showPopup, setShowPopup] = useState(false);
  const [showTerminePopup, setShowTerminePopup] = useState(false);
  const [tempGrund, setTempGrund] = useState(formData.grundTermin || '');

  // Wenn ein Grund ausgewählt wird und es ein neuer Wert ist
  useEffect(() => {
    if (formData.grundTermin && formData.grundTermin !== tempGrund) {
      setTempGrund(formData.grundTermin);
      setShowPopup(true);
    }
  }, [formData.grundTermin, tempGrund]);

  const handleCancel = () => {
    setShowPopup(false);
    // Grund zurücksetzen
    handleChange({
      target: { name: 'grundTermin', value: '' }
    });
  };

  const handleConfirm = () => {
    setShowPopup(false);
    
    // Verwende die als Prop übergebene Funktion, wenn verfügbar
    if (onChangeStep && typeof onChangeStep === 'function') {
      onChangeStep(4);
      return;
    }
    
    // Fallbacks für den Step-Wechsel
    // 1. Versuche über das parent.window
    if (window.setStepForSelected && typeof window.setStepForSelected === 'function') {
      window.setStepForSelected(4);
      return;
    }
    
    // 2. Versuche über globale window-Funktion
    if (window.parent && typeof window.parent.setStepForSelected === 'function') {
      window.parent.setStepForSelected(4);
      return;
    }
    
    // 3. Löse ein Event aus
    try {
      const event = new CustomEvent('changeStep', { detail: { step: 4 } });
      window.dispatchEvent(event);
      console.log('Event changeStep ausgelöst');
    } catch (error) {
      console.error('Fehler beim Auslösen des Events:', error);
    }
  };

  const isReadOnly = currentStep > 1;
  const termine = formData.termineHistorie || [];

  // Prüfe ob alle Pflichtfelder ausgefüllt sind
  const requiredFields = ['vorname', 'nachname', 'sprache', 'telefon', 'email', 'auto', 'euBuerger', 'region', 'erhalten', 'kontaktdatum', 'filiale', 'datumTermin', 'uhrzeitTermin'];
  const isStep1Valid = requiredFields.every(field => !!formData[field]);

  const handleWeiterClick = () => {
    if (onChangeStep && typeof onChangeStep === 'function') {
      onChangeStep(2);
    }
  };

  return (
    <div className="form-step" style={{ marginLeft: '20px' }}>
      <div className="grid grid-cols-1 gap-4">
        <div className="form-row">
          <label>Vorname</label>
          <input
            name="vorname"
            value={formData.vorname || ''}
            onChange={isReadOnly ? undefined : handleChange}
            className="input"
            readOnly={isReadOnly}
            style={isReadOnly ? { backgroundColor: '#f5f5f5' } : {}}
          />
        </div>
        <div className="form-row">
          <label>Nachname</label>
          <input
            name="nachname"
            value={formData.nachname || ''}
            onChange={isReadOnly ? undefined : handleChange}
            className="input"
            readOnly={isReadOnly}
            style={isReadOnly ? { backgroundColor: '#f5f5f5' } : {}}
          />
        </div>
        <div className="form-row">
          <label>Sprache</label>
          <select
            name="sprache"
            value={formData.sprache || ''}
            onChange={isReadOnly ? undefined : handleChange}
            className="input"
            disabled={isReadOnly}
            style={isReadOnly ? { backgroundColor: '#f5f5f5' } : {}}
          >
            <option value=""> </option>
            <option value="Deutsch">Deutsch</option>
            <option value="Englisch">Englisch</option>
            <option value="Ungarisch">Ungarisch</option>
            <option value="Slowakisch">Slowakisch</option>
            <option value="Tschechisch">Tschechisch</option>
            <option value="Bulgarisch">Bulgarisch</option>
            <option value="Rumänisch">Rumänisch</option>
            <option value="Polnisch">Polnisch</option>
            <option value="Russisch">Russisch</option>
            <option value="Kroatisch">Kroatisch</option>
            <option value="Serbisch">Serbisch</option>
            <option value="Bosnisch">Bosnisch</option>
            <option value="Türkisch">Türkisch</option>
            <option value="Arabisch">Arabisch</option>
            <option value="Spanisch">Spanisch</option>
            <option value="Französisch">Französisch</option>
            <option value="Italienisch">Italienisch</option>
            <option value="Albanisch">Albanisch</option>
            {/* ...weitere Sprachen falls nötig... */}
          </select>
        </div>
        <div className="form-row">
          <label>Telefonnummer</label>
          <input
            name="telefon"
            value={formData.telefon || ''}
            onChange={isReadOnly ? undefined : handleChange}
            className="input"
            readOnly={isReadOnly}
            style={isReadOnly ? { backgroundColor: '#f5f5f5' } : {}}
          />
        </div>
        <div className="form-row">
          <label>E-Mail</label>
          <input
            name="email"
            value={formData.email || ''}
            onChange={isReadOnly ? undefined : handleChange}
            className="input"
            readOnly={isReadOnly}
            style={isReadOnly ? { backgroundColor: '#f5f5f5' } : {}}
          />
        </div>
        <div className="form-row">
          <label>Eigenes Auto</label>
          <select
            name="auto"
            value={formData.auto || ''}
            onChange={isReadOnly ? undefined : handleChange}
            className="input"
            disabled={isReadOnly}
            style={isReadOnly ? { backgroundColor: '#f5f5f5' } : {}}
          >
            <option value=""> </option>
            <option>Ja, habe ich</option>
            <option>Nur Führerschein, kein Auto</option>
            <option>Kein Führerschein, kein Auto</option>
          </select>
        </div>
        <div className="form-row">
          <label>EU-Bürger</label>
          <select
            name="euBuerger"
            value={formData.euBuerger || ''}
            onChange={isReadOnly ? undefined : handleChange}
            className="input"
            disabled={isReadOnly}
            style={isReadOnly ? { backgroundColor: '#f5f5f5' } : {}}
          >
            <option value=""> </option>
            <option>Ja</option>
            <option>Nein</option>
          </select>
        </div>
        <div className="form-row">
          <label>Region</label>
          <input
            name="region"
            value={formData.region || ''}
            onChange={isReadOnly ? undefined : handleChange}
            className="input"
            readOnly={isReadOnly}
            style={isReadOnly ? { backgroundColor: '#f5f5f5' } : {}}
          />
        </div>
        <div className="form-row">
          <label>Erhalten</label>
          <select
            name="erhalten"
            value={formData.erhalten || ''}
            onChange={isReadOnly ? undefined : handleChange}
            className="input"
            disabled={isReadOnly}
            style={isReadOnly ? { backgroundColor: '#f5f5f5' } : {}}
          >
            <option value=""> </option>
            <option>HiTalent</option>
            <option>feibra Jobs</option>
            <option>E-Mail</option>
            <option>Telefonisch</option>
            <option>Persönlich</option>
            <option>Inserate</option>
            <option>Verteiler wirbt Verteiler</option>
          </select>
        </div>
        <div className="form-row">
          <label>Kontaktdatum</label>
          <input
            type="date"
            name="kontaktdatum"
            value={formData.kontaktdatum || ''}
            onChange={isReadOnly ? undefined : handleChange}
            className="input"
            readOnly={isReadOnly}
            style={isReadOnly ? { backgroundColor: '#f5f5f5' } : {}}
          />
        </div>
        {/* Kontaktaufnahme nur anzeigen, wenn Sprache nicht Deutsch */}
        {formData.sprache && formData.sprache !== 'Deutsch' && (
          <div className="form-row">
            <label>Kontaktaufnahme</label>
            <select
              name="kontaktaufnahme"
              value={formData.kontaktaufnahme || ''}
              onChange={isReadOnly ? undefined : handleChange}
              className="input"
              disabled={isReadOnly}
              style={isReadOnly ? { backgroundColor: '#f5f5f5' } : {}}
            >
              <option value=""> </option>
              <option value="Fil01">Fil01</option>
              <option value="Fil02">Fil02</option>
              <option value="Fil03">Fil03</option>
              <option value="Fil05">Fil05</option>
              <option value="Fil06">Fil06</option>
              <option value="Fil07">Fil07</option>
              <option value="Fil08">Fil08</option>
              <option value="Fil09">Fil09</option>
              <option value="Fil10">Fil10</option>
              <option value="Fil13">Fil13</option>
              <option value="Fil15">Fil15</option>
            </select>
          </div>
        )}
        <div style={{ height: 18 }} />
        <div className="form-row">
          <label>Anzahl Termine</label>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ 
              fontSize: '0.9rem', 
              color: '#444', 
              fontWeight: 600,
              minWidth: '20px'
            }}>
              {termine.length}
            </span>
            {termine.length > 0 && (
              <button 
                type="button"
                onClick={() => setShowTerminePopup(true)}
                style={{
                  padding: '2px 8px',
                  background: '#f5f5f5',
                  color: '#666',
                  border: '1px solid #ddd',
                  borderRadius: '4px',
                  fontSize: '0.8rem',
                  cursor: 'pointer',
                  lineHeight: '1.2'
                }}
              >
                ...
              </button>
            )}
          </div>
        </div>
        <div className="form-row">
          <label>Filiale</label>
          <select
            name="filiale"
            value={formData.filiale || ''}
            onChange={isReadOnly ? undefined : handleChange}
            className="input"
            required
            disabled={isReadOnly}
            style={isReadOnly ? { backgroundColor: '#f5f5f5' } : {}}
          >
            <option value=""> </option>
            <option value="Fil01">Fil01</option>
            <option value="Fil02">Fil02</option>
            <option value="Fil03">Fil03</option>
            <option value="Fil05">Fil05</option>
            <option value="Fil06">Fil06</option>
            <option value="Fil07">Fil07</option>
            <option value="Fil08">Fil08</option>
            <option value="Fil09">Fil09</option>
            <option value="Fil10">Fil10</option>
            <option value="Fil13">Fil13</option>
            <option value="Fil15">Fil15</option>
          </select>
        </div>
        <div className="form-row">
          <label>Datum Termin</label>
          <input
            type="date"
            name="datumTermin"
            value={formData.datumTermin || ''}
            onChange={isReadOnly ? undefined : handleChange}
            className="input"
            readOnly={isReadOnly}
            style={isReadOnly ? { backgroundColor: '#f5f5f5' } : {}}
          />
        </div>
        <div className="form-row">
          <label>Uhrzeit Termin</label>
          <input
            type="time"
            name="uhrzeitTermin"
            value={formData.uhrzeitTermin || ''}
            onChange={isReadOnly ? undefined : handleChange}
            className="input"
            readOnly={isReadOnly}
            style={isReadOnly ? { backgroundColor: '#f5f5f5' } : {}}
          />
        </div>
        <div className="form-row">
          <label>Kein Termin</label>
          <input
            type="checkbox"
            name="keinTermin"
            checked={!!formData.keinTermin}
            onChange={isReadOnly ? undefined : e => {
              const isChecked = e.target.checked;
              
              // Kein Termin Wert setzen
              handleChange({
                target: { name: 'keinTermin', value: isChecked },
              });
              
              // Wenn "Kein Termin" aktiviert wird, Datum und Uhrzeit leeren
              if (isChecked) {
                handleChange({
                  target: { name: 'datumTermin', value: '' }
                });
                handleChange({
                  target: { name: 'uhrzeitTermin', value: '' }
                });
              }
            }}
            disabled={isReadOnly}
            style={{ 
              width: 18, 
              height: 18,
              ...(isReadOnly ? { backgroundColor: '#f5f5f5', cursor: 'not-allowed' } : {})
            }}
          />
        </div>
        {formData.keinTermin && (
          <div className="form-row">
            <label>Grund</label>
            <select
              name="grundTermin"
              value={formData.grundTermin || ''}
              onChange={isReadOnly ? undefined : handleChange}
              className="input"
              disabled={isReadOnly}
              style={isReadOnly ? { backgroundColor: '#f5f5f5' } : {}}
            >
              <option value=""> </option>
              {GRUENDE.map((g) => (
                <option key={g}>{g}</option>
              ))}
            </select>
          </div>
        )}
      </div>
      
      {!isReadOnly && (
        <>
          <StatusPopup 
            isOpen={showPopup} 
            onCancel={handleCancel} 
            onConfirm={handleConfirm} 
          />
          
          <FruehereTerminePopup
            isOpen={showTerminePopup}
            onClose={() => setShowTerminePopup(false)}
            termine={termine}
          />
        </>
      )}
      
      {/* Weiter Button */}
      {!isReadOnly && isStep1Valid && (
        <div style={{ 
          display: 'flex', 
          marginTop: '30px',
          justifyContent: 'center',
          marginLeft: '90px'
        }}>
          <button 
            className="btn btn-primary"
            onClick={handleWeiterClick}
            style={{ 
              padding: '7px 20px',
              fontSize: '1rem'
            }}
          >
            Weiter
          </button>
        </div>
      )}
    </div>
  );
};

export default BewerberFormStep1;
