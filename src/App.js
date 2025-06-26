import React, { useState } from 'react';
import HeaderBar from './assets/components/HeaderBar';
import BewerberFormStep1 from './assets/components/BewerberFormStep1';
import BewerberFormStep2 from './assets/components/BewerberFormStep2';
import BewerberFormStep3 from './assets/components/BewerberFormStep3';
import BewerberFormStep4 from './assets/components/BewerberFormStep4';
import BewerberTabelle from './assets/components/BewerberTabelle';

const leeresFormular = () => ({
  vorname: '',
  nachname: '',
  sprache: '',
  telefon: '',
  email: '',
  auto: '',
  euBuerger: '',
  region: '',
  erschienen: '',
  infotag: '',
  uhrzeit: '',
  auftrag: '',
  grund: '',
  filiale: ''
});

const App = () => {
  const [eintraege, setEintraege] = useState([]); // [{id, step, formData}]
  const [selectedId, setSelectedId] = useState(null);

  // Handler für NEU-Button (wird an HeaderBar übergeben)
  const handleNeu = () => {
    const id = Date.now() + Math.random();
    setEintraege(e => [...e, { id, step: 1, formData: leeresFormular() }]);
    setSelectedId(id);
  };

  // Handler für Step-Wechsel
  const setStepForSelected = (step) => {
    setEintraege(e => e.map(entry => entry.id === selectedId ? { ...entry, step } : entry));
  };

  // Handler für Formularänderung
  const handleChange = (e) => {
    const { name, value } = e.target;
    setEintraege(e => e.map(entry =>
      entry.id === selectedId
        ? { ...entry, formData: { ...entry.formData, [name]: value } }
        : entry
    ));
  };

  // Aktueller Eintrag
  const aktuellerEintrag = eintraege.find(e => e.id === selectedId);
  const step = aktuellerEintrag?.step || 1;
  const formData = aktuellerEintrag?.formData || leeresFormular();

  // Stepper-Farben
  const stepColors = ['#2684ff', '#f3581bff', '#d09434', '#a259e6'];

  // Tabelle vorbereiten
  const tabelleEintraege = eintraege.map(entry => ({
    id: entry.id,
    step: entry.step,
    name: (entry.formData.vorname + ' ' + entry.formData.nachname).trim(),
    filiale: entry.formData.filiale,
    datum: entry.formData.datumTermin,
    uhrzeit: entry.formData.uhrzeitTermin
  }));

  return (
    <div className="app">
      <HeaderBar count={tabelleEintraege.length} onNeu={handleNeu} />
      <div className="main">
        <aside className="sidebar">
          <BewerberTabelle
            eintraege={tabelleEintraege}
            selectedId={selectedId}
            onSelect={setSelectedId}
          />
        </aside>
        <main className="form-area">
          {selectedId && (
            <>
              <div className="stepper-blur-bg">
                <div className="stepper stepper-long">
                  {[1,2,3,4].map((nr, idx) => (
                    <div key={nr} className={`stepper-step${step === nr ? ' active' : ''}${step > nr ? ' done' : ''}`}> 
                      <div
                        className="stepper-circle"
                        onDoubleClick={() => setStepForSelected(nr)}
                        style={step === nr ? { background: stepColors[idx], color: '#fff', border: `2px solid ${stepColors[idx]}` } : {cursor: 'pointer'}}
                      >
                        {nr}
                      </div>
                      {nr < 4 && <div className="stepper-line" />}
                    </div>
                  ))}
                </div>
              </div>
              <div className="steps-row-fixed">
                {[0,1,2,3].map((idx) => (
                  <React.Fragment key={idx}>
                    <div style={{position:'relative', display:'flex', flexDirection:'column'}}>
                      {idx === 0 && step >= 1 && <BewerberFormStep1 formData={formData} handleChange={handleChange} />}
                      {idx === 1 && step >= 2 && <BewerberFormStep2 formData={formData} handleChange={handleChange} />}
                      {idx === 2 && step >= 3 && <BewerberFormStep3 formData={formData} handleChange={handleChange} />}
                      {idx === 3 && step >= 4 && <BewerberFormStep4 formData={formData} handleChange={handleChange} />}
                      {idx === 0 && step >= 2 && (
                        <div style={{
                          position: 'absolute',
                          right: '-105px',
                          top: 0,
                          height: '100%',
                          width: '1px',
                          background: '#e0e0e0',
                          zIndex: 2
                        }} />
                      )}
                      {idx === 1 && step >= 3 && (
                        <div style={{
                          position: 'absolute',
                          right: '-105px',
                          top: 0,
                          height: '100%',
                          width: '1px',
                          background: '#e0e0e0',
                          zIndex: 2
                        }} />
                      )}
                    </div>
                  </React.Fragment>
                ))}
              </div>
            </>
          )}
        </main>
      </div>
    </div>
  );
};

export default App;
