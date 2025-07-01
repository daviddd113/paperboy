import React, { useState } from 'react';
import BewerberPopup from './BewerberPopup';

const BewerberFormStep3 = ({ formData, handleChange, onChangeStep, currentStep }) => {
  const [showPopup, setShowPopup] = useState(false);

  // Callback für gespeicherte Daten aus dem Popup
  function handlePopupSave(nr) {
    handleChange({
      target: { name: 'verteilernr', value: nr }
    });
    setShowPopup(false);
  }

  const isReadOnly = currentStep > 3;
  const isStep3Valid = !isReadOnly && formData.verteilernr;

  const handleWeiterClick = () => {
    if (onChangeStep && typeof onChangeStep === 'function') {
      onChangeStep(4);
    }
  };

  return (
    <div className="form-step" style={{ marginLeft: '40px' }}>
      <div className="form-row">
        <label>Verteilernr.</label>
        <input
          name="verteilernr"
          value={formData.verteilernr || ''}
          readOnly
          className="input"
        />
      </div>
      <div style={{ display: 'flex', justifyContent: 'center', marginLeft: '100px', marginTop: '10px' }}>
        <button className="btn btn-success" onClick={() => setShowPopup(true)}>
          Verteilerdaten
        </button>
      </div>
      {/* Weiter Button */}
      {isStep3Valid && (
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
      <BewerberPopup open={showPopup} onClose={() => setShowPopup(false)} onSave={handlePopupSave} initialNr={formData.verteilernr || ''} />
    </div>
  );
};

export default BewerberFormStep3;
