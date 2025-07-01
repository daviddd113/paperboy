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

const EINSCHULER_OPTIONS = [
  'Müller - 1234',
  'Schmidt - 5678',
  'Weber - 9876',
  'Wagner - 4321',
  'Becker - 11234',
  'Schulz - 56789',
  'Hoffmann - 98765',
  'Schäfer - 43210'
];

// Popup-Komponente für "Erschienen = Nein"
const StatusPopupStep1 = ({ isOpen, onCancel, onConfirm }) => {
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
        <h3 style={{ marginBottom: '20px' }}>Status 1?</h3>
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

// Popup-Komponente für "Grund" ausgewählt
const StatusPopupStep4 = ({ isOpen, onCancel, onConfirm }) => {
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

const BewerberFormStep2 = ({ formData, handleChange, onChangeStep, currentStep }) => {
  const [showPopupStep1, setShowPopupStep1] = useState(false);
  const [tempErschienen, setTempErschienen] = useState(formData.erschienen || '');

  // Wenn "Erschienen" auf "Nein" gesetzt wird
  useEffect(() => {
    if (formData.erschienen === 'Nein' && formData.erschienen !== tempErschienen) {
      setTempErschienen(formData.erschienen);
      setShowPopupStep1(true);
    }
  }, [formData.erschienen]);

  const handleCancelStep1 = () => {
    setShowPopupStep1(false);
    // Erschienen-Feld zurücksetzen
    handleChange({
      target: { name: 'erschienen', value: '' }
    });
    setTempErschienen('');
  };

  const handleConfirmStep1 = () => {
    setShowPopupStep1(false);
    
    // Hier wird der Termin zur Historie hinzugefügt - nur beim OK-Klick!
    if (formData.datumTermin && formData.uhrzeitTermin) {
      const neuerTermin = {
        id: Date.now(),
        datum: formData.datumTermin,
        uhrzeit: formData.uhrzeitTermin,
        erschienen: 'Nein',
        grund: 'Nicht erschienen',
        erstellt: new Date().toISOString()
      };
      
      const aktuelleHistorie = formData.termineHistorie || [];
      handleChange({
        target: { 
          name: 'termineHistorie', 
          value: [...aktuelleHistorie, neuerTermin]
        }
      });
      
      handleChange({
        target: { 
          name: 'anzahlTermine', 
          value: aktuelleHistorie.length + 1
        }
      });
    }
    
    // Datum Termin und Uhrzeit Termin leeren
    handleChange({
      target: { name: 'datumTermin', value: '' }
    });
    handleChange({
      target: { name: 'uhrzeitTermin', value: '' }
    });
    
    // Zurück zu Step 1
    if (onChangeStep && typeof onChangeStep === 'function') {
      onChangeStep(1);
      return;
    }
    
    // Fallbacks für den Step-Wechsel
    if (window.setStepForSelected && typeof window.setStepForSelected === 'function') {
      window.setStepForSelected(1);
      return;
    }
    
    try {
      const event = new CustomEvent('changeStep', { detail: { step: 1 } });
      window.dispatchEvent(event);
    } catch (error) {
      console.error('Fehler beim Auslösen des Events:', error);
    }
  };

  // NEUE Funktion für Fertig-Button
  const handleFertigClick = () => {
    // Zu Step 4 springen
    if (onChangeStep && typeof onChangeStep === 'function') {
      onChangeStep(4);
      return;
    }
    
    // Fallbacks für den Step-Wechsel
    if (window.setStepForSelected && typeof window.setStepForSelected === 'function') {
      window.setStepForSelected(4);
      return;
    }
    
    try {
      const event = new CustomEvent('changeStep', { detail: { step: 4 } });
      window.dispatchEvent(event);
    } catch (error) {
      console.error('Fehler beim Auslösen des Events:', error);
    }
  };

  const isReadOnly = currentStep > 2;
  const showFertigButton = !isReadOnly && formData.auftrag === 'Nein' && formData.grund;
  
  // Prüfe ob Step 2 für "Weiter" bereit ist (nur bei Auftrag = "Ja")
  const isStep2ValidForWeiter = !isReadOnly && formData.erschienen && formData.auftrag === 'Ja';

  const handleWeiterClick = () => {
    if (onChangeStep && typeof onChangeStep === 'function') {
      onChangeStep(3);
    }
  };

  return (
    <div className="form-step" style={{ marginLeft: '30px' }}>
      <div className="grid grid-cols-1 gap-4">
        <div className="form-row">
          <label>Erschienen</label>
          <select
            name="erschienen"
            value={formData.erschienen || ''}
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
          <label>Informationstag</label>
          <input
            type="date"
            name="infotag"
            value={formData.infotag || ''}
            onChange={isReadOnly ? undefined : handleChange}
            className="input"
            disabled={isReadOnly}
            style={isReadOnly ? { backgroundColor: '#f5f5f5' } : {}}
          />
        </div>
        <div className="form-row">
          <label>Uhrzeit</label>
          <input
            type="time"
            name="uhrzeit"
            value={formData.uhrzeit || ''}
            onChange={isReadOnly ? undefined : handleChange}
            className="input"
            readOnly={isReadOnly}
            style={isReadOnly ? { backgroundColor: '#f5f5f5' } : {}}
          />
        </div>
        
        <div className="form-row">
          <label>Einschuler</label>
          <select
            name="einschuler"
            value={formData.einschuler || ''}
            onChange={isReadOnly ? undefined : handleChange}
            className="input"
            disabled={isReadOnly}
            style={isReadOnly ? { backgroundColor: '#f5f5f5' } : {}}
          >
            <option value=""> </option>
            {EINSCHULER_OPTIONS.map(option => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
        </div>
        <div className="form-row">
          <label>Auftr. übernommen</label>
          <select
            name="auftrag"
            value={formData.auftrag || ''}
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
        {formData.auftrag === 'Nein' && (
          <>
            <div className="form-row">
              <label>Grund</label>
              <select
                name="grund"
                value={formData.grund || ''}
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
            <div className="form-row">
              <label>Anmerkung</label>
              <input
                name="anmerkung"
                value={formData.anmerkung || ''}
                onChange={isReadOnly ? undefined : handleChange}
                className="input"
                disabled={isReadOnly}
                style={isReadOnly ? { backgroundColor: '#f5f5f5' } : {}}
              />
            </div>
          </>
        )}
      </div>
      
      {/* Weiter Button - nur bei Auftrag = "Ja" */}
      {isStep2ValidForWeiter && (
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
      
      {/* Fertig Button - nur bei Auftrag = "Nein" und Grund ausgewählt */}
      {showFertigButton && (
        <div style={{ 
          display: 'flex', 
          marginTop: '30px',
          justifyContent: 'center',
          marginLeft: '90px'
        }}>
          <button 
            className="btn btn-primary"
            onClick={handleFertigClick}
            style={{ 
              padding: '7px 20px',
              fontSize: '1rem'
            }}
          >
            Fertig
          </button>
        </div>
      )}
      
      {!isReadOnly && (
        <StatusPopupStep1 
          isOpen={showPopupStep1} 
          onCancel={handleCancelStep1} 
          onConfirm={handleConfirmStep1} 
        />
      )}
    </div>
  );
};


export default BewerberFormStep2;
