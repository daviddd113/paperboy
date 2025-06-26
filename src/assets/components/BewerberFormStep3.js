import React, { useState } from 'react';
import BewerberPopup from './BewerberPopup';

const BewerberFormStep3 = ({ formData, handleChange }) => {
  const [showPopup, setShowPopup] = useState(false);
  const [verteilernr, setVerteilernr] = useState('');

  // Callback für gespeicherte Daten aus dem Popup
  function handlePopupSave(nr) {
    setVerteilernr(nr);
    setShowPopup(false);
  }

  return (
    <div className="form-step">
      <div className="form-row">
        <label>Verteilernr.</label>
        <input
          name="verteilernr"
          value={verteilernr}
          readOnly
          className="input"
        />
      </div>
      <button className="btn btn-primary" style={{marginTop: 18}} onClick={() => setShowPopup(true)}>Anlegen</button>
      <BewerberPopup open={showPopup} onClose={() => setShowPopup(false)} onSave={handlePopupSave} initialNr={verteilernr} />
    </div>
  );
};

export default BewerberFormStep3;
