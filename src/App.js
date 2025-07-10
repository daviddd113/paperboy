import React, { useState, useEffect } from 'react';
import './styles.css'; // CSS importieren
import HeaderBar from './assets/components/HeaderBar';
import BewerberFormStep1 from './assets/components/BewerberFormStep1';
import BewerberFormStep2 from './assets/components/BewerberFormStep2';
import BewerberFormStep3 from './assets/components/BewerberFormStep3';
import BewerberFormStep4 from './assets/components/BewerberFormStep4';
import BewerberTabelle from './assets/components/BewerberTabelle';
import AgendaSidebar from './assets/components/AgendaSidebar';

const leeresFormular = () => ({
  vorname: '',
  nachname: '',
  sprache: '',
  telefon: '',
  email: '',
  auto: '',
  euBuerger: '',
  region: '',
  erhalten: '',
  kontaktdatum: '',
  kontaktaufnahme: '',
  keinTermin: false,
  grundTermin: '',
  filiale: '',
  datumTermin: '',
  uhrzeitTermin: '',
  erschienen: '',
  infotag: '',
  uhrzeit: '',
  einschuler: '',
  auftrag: '',
  grund: '',
  anmerkung: '',
  verteilernr: '',
  anzahlTermine: 0,
  termineHistorie: []
});

// Standardeinträge mit vorbefüllten Daten
const standardEintraege = () => [
  {
    id: 1001,
    step: 2,
    formData: {
      vorname: 'Maria',
      nachname: 'Müller',
      sprache: 'Deutsch',
      telefon: '+43 664 1234567',
      email: 'maria.mueller@email.com',
      auto: 'Ja, habe ich',
      euBuerger: 'Ja',
      region: 'Wien',
      erhalten: 'Telefonisch',
      kontaktdatum: '2025-06-30',
      kontaktaufnahme: '',
      keinTermin: false,
      grundTermin: '',
      filiale: 'Fil01',
      datumTermin: '2025-07-09',
      uhrzeitTermin: '09:00',
      erschienen: 'Ja',
      infotag: '',
      uhrzeit: '',
      einschuler: '',
      auftrag: 'Ja',
      grund: '',
      anmerkung: '',
      verteilernr: '',
      anzahlTermine: 0,
      termineHistorie: []
    }
  },
  {
    id: 1002,
    step: 2,
    formData: {
      vorname: 'Ahmed',
      nachname: 'Hassan',
      sprache: 'Arabisch',
      telefon: '+43 699 9876543',
      email: 'ahmed.hassan@email.com',
      auto: 'Nur Führerschein, kein Auto',
      euBuerger: 'Nein',
      region: 'Graz',
      erhalten: 'E-Mail',
      kontaktdatum: '2025-07-01',
      kontaktaufnahme: 'Fil02',
      keinTermin: false,
      grundTermin: '',
      filiale: 'Fil02',
      datumTermin: '2025-07-10',
      uhrzeitTermin: '14:30',
      erschienen: 'Ja',
      infotag: '2025-07-14',
      uhrzeit: '10:00',
      einschuler: '',
      auftrag: '',
      grund: '',
      anmerkung: '',
      verteilernr: '',
      anzahlTermine: 0,
      termineHistorie: []
    }
  },
  {
    id: 1003,
    step: 1,
    formData: {
      vorname: 'Anna',
      nachname: 'Schmidt',
      sprache: 'Deutsch',
      telefon: '+43 650 5555666',
      email: 'anna.schmidt@email.com',
      auto: 'Kein Führerschein, kein Auto',
      euBuerger: 'Ja',
      region: 'Salzburg',
      erhalten: 'HiTalent',
      kontaktdatum: '2025-07-03',
      kontaktaufnahme: '',
      keinTermin: false,
      grundTermin: '',
      filiale: 'Fil03',
      datumTermin: '2025-07-11',
      uhrzeitTermin: '11:00',
      erschienen: '',
      infotag: '',
      uhrzeit: '',
      einschuler: '',
      auftrag: '',
      grund: '',
      anmerkung: '',
      verteilernr: '',
      anzahlTermine: 0,
      termineHistorie: []
    }
  }
];


const requiredStep1 = [
  'vorname', 'nachname', 'sprache', 'telefon', 'email', 'auto', 'euBuerger', 'region', 'erhalten', 'kontaktdatum', 'filiale', 'datumTermin', 'uhrzeitTermin'
];


function isStep1Valid(formData) {
  return requiredStep1.every(f => !!formData[f]);
}
function isStep2Valid(formData) {
  const baseFields = ['erschienen', 'auftrag'];
  const baseValid = baseFields.every(f => !!formData[f]);
  
  // Wenn "auftrag" = "Nein", dann ist auch "grund" ein Pflichtfeld
  if (formData.auftrag === 'Nein') {
    return baseValid && !!formData.grund;
  }
  
  return baseValid;
}

const App = () => {
  const [eintraege, setEintraege] = useState(standardEintraege()); // <-- Korrektur: Funktion aufrufen!
  const [selectedId, setSelectedId] = useState(1001);
  const [filteredEintraege, setFilteredEintraege] = useState(standardEintraege()); // <-- Korrektur: Funktion aufrufen!
  const [agendaOpen, setAgendaOpen] = useState(false);

  // Synchronisiere filteredEintraege mit eintraege, wenn sich eintraege ändern und kein Filter aktiv ist
  useEffect(() => {
    setFilteredEintraege(eintraege);
  }, [eintraege]);

  // Filter-Handler
  const handleFilterChange = (filtered) => {
    setFilteredEintraege(filtered);
    
    // Prüfe ob der aktuell ausgewählte Eintrag noch in den gefilterten Ergebnissen ist
    const isSelectedInFiltered = filtered.some(entry => entry.id === selectedId);
    
    // Wenn nicht, deaktiviere die Auswahl
    if (!isSelectedInFiltered && selectedId) {
      setSelectedId(null);
    }
  };

  // Handler für NEU-Button (wird an HeaderBar übergeben)
  const handleNeu = () => {
    const id = Date.now() + Math.random();
    setEintraege(e => [...e, { id, step: 1, formData: leeresFormular() }]);
    setSelectedId(id);
  };

  // Handler für Step-Wechsel mit optionalem Parameter für automatische Sprünge
  const setStepForSelected = (targetStep, isAutomatic = false) => {
    const currentStep = aktuellerEintrag?.step || 1;
    
    // Bei manuellen Wechseln (Doppelklick) nur einen Step vor oder zurück erlauben
    if (!isAutomatic && Math.abs(targetStep - currentStep) > 1) {
      return; // Blockiere manuelle Sprünge über mehrere Steps
    }
    
    // Erlaube Vorwärts nur bei gültigen vorherigen Steps (gilt für beide Arten)
    if (targetStep > currentStep) {
      if (targetStep === 2 && !isStep1Valid(formData)) {
        alert('Bitte alle Pflichtfelder in Step 1 ausfüllen.');
        return;
      }
      if (targetStep === 3 && !isStep2Valid(formData)) {
        alert('Bitte alle Pflichtfelder in Step 2 ausfüllen.');
        return;
      }
    }
    
    // Bei Rückwärtsbewegung: Daten aus höheren Steps leeren
    if (targetStep < currentStep) {
      setEintraege(e => e.map(entry => {
        if (entry.id === selectedId) {
          const clearedData = { ...entry.formData };
          
          // Step 2 Felder leeren wenn von Step 3/4 zu Step 1/2 gewechselt wird
          if (currentStep >= 2 && targetStep <= 1) {
            clearedData.erschienen = '';
            clearedData.infotag = '';
            clearedData.uhrzeit = '';
            clearedData.auftrag = '';
            clearedData.grund = '';
            clearedData.anmerkung = '';
          }
          
          // Step 3 Felder leeren wenn von Step 4 zu Step 1/2/3 gewechselt wird
          if (currentStep >= 3 && targetStep <= 2) {
            clearedData.verteilernr = '';
            // Weitere Step 3 Felder hier hinzufügen falls vorhanden
          }
          
          // Step 4 Felder leeren wenn zu Step 1/2/3 gewechselt wird
          if (currentStep >= 4 && targetStep <= 3) {
            // Step 4 Felder hier hinzufügen falls vorhanden
          }
          
          return { ...entry, step: targetStep, formData: clearedData };
        }
        return entry;
      }));
    } else {
      // Normale Vorwärtsbewegung ohne Daten zu leeren
      setEintraege(e => e.map(entry => entry.id === selectedId ? { ...entry, step: targetStep } : entry));
    }
  };

  // Handler für Formularänderung
  const handleChange = (e) => {
    const { name, value } = e.target;
    
    setEintraege(e => e.map(entry => {
      if (entry.id === selectedId) {
        const updatedEntry = { ...entry, formData: { ...entry.formData, [name]: value } };
        
        // Entferne die automatische Historie-Hinzufügung hier
        // Die Logik wird jetzt nur in BewerberFormStep2 beim OK-Klick ausgeführt
        
        return updatedEntry;
      }
      return entry;
    }));
  };

  // Aktueller Eintrag - nur wenn er in gefilterten Einträgen ist
  const aktuellerEintrag = selectedId ? filteredEintraege.find(e => e.id === selectedId) : null;
  const step = aktuellerEintrag?.step || 1;
  const formData = aktuellerEintrag?.formData || leeresFormular();

  // Stepper-Farben
  const stepColors = ['#2684ff', '#f3581bff', '#d09434', '#a259e6'];

  // Tabelle vorbereiten - verwende gefilterte Einträge
  const tabelleEintraege = filteredEintraege.map(entry => ({
    id: entry.id,
    step: entry.step,
    grund: entry.formData.grund, // Grund aus Step 2
    grundTermin: entry.formData.grundTermin, // HINZUGEFÜGT - Grund aus Step 1
    name: (entry.formData.vorname + ' ' + entry.formData.nachname).trim(),
    filiale: entry.formData.filiale,
    kontaktdatum: entry.formData.kontaktdatum,
    datum: entry.formData.datumTermin,
    uhrzeit: entry.formData.uhrzeitTermin
  }));

  // Event-Listener für Step-Wechsel über Events
  useEffect(() => {
    const handleStepChange = (event) => {
      if (event.detail && event.detail.step) {
        // Automatische Sprünge über Events sind immer erlaubt
        setStepForSelected(event.detail.step, true);
      }
    };

    window.addEventListener('changeStep', handleStepChange);
    
    // Für direkte Aufrufe vom Popup - ebenfalls automatisch
    window.setStepForSelected = (step) => setStepForSelected(step, true);

    return () => {
      window.removeEventListener('changeStep', handleStepChange);
      delete window.setStepForSelected;
    };
  }, [selectedId, formData]);

  return (
    <div className="app">
      <HeaderBar 
        count={tabelleEintraege.length} 
        onNeu={handleNeu} 
        eintraege={eintraege}
        onFilterChange={handleFilterChange}
      />
      <div className="main">
        <aside className="sidebar">
          <BewerberTabelle
            eintraege={tabelleEintraege}
            selectedId={selectedId}
            onSelect={setSelectedId}
          />
        </aside>
        <main className="form-area" style={{ overflowX: 'hidden' }}>
          {selectedId && aktuellerEintrag && (
            <>
              <div className="stepper-blur-bg">
                <div className="stepper stepper-long">
                  {[1,2,3,4].map((nr, idx) => (
                    <div key={nr} className={`stepper-step${step === nr ? ' active' : ''}${step > nr ? ' done' : ''}`}> 
                      <div
                        className="stepper-circle"
                        onDoubleClick={() => {
                          // Manueller Doppelklick - nur einen Step vor oder zurück erlauben
                          if (Math.abs(nr - step) <= 1) {
                            if (
                              (nr === 2 && !isStep1Valid(formData)) ||
                              (nr === 3 && !isStep2Valid(formData))
                            ) {
                              alert('Bitte alle Pflichtfelder ausfüllen.');
                              return;
                            }
                            setStepForSelected(nr, false); // false = manueller Wechsel
                          }
                        }}
                        style={step === nr ? { background: stepColors[idx], color: '#fff', border: `2px solid ${stepColors[idx]}` } : {cursor: 'pointer'}}
                      >
                        {nr}
                      </div>
                      {nr < 4 && <div className="stepper-line" />}
                    </div>
                  ))}
                </div>
              </div>
              <div className="steps-row-fixed" style={{ overflowX: 'hidden', maxWidth: '100%' }}>
                {[0,1,2,3].map((idx) => (
                  <React.Fragment key={idx}>
                    <div style={{position:'relative', display:'flex', flexDirection:'column'}}>
                      {idx === 0 && step >= 1 && (
                        <BewerberFormStep1 
                          formData={formData} 
                          handleChange={handleChange} 
                          onChangeStep={(step) => setStepForSelected(step, true)} // true = automatischer Wechsel
                          currentStep={step}
                        />
                      )}
                      {idx === 1 && step >= 2 && (
                        <BewerberFormStep2 
                          formData={formData} 
                          handleChange={handleChange}
                          onChangeStep={(step) => setStepForSelected(step, true)} // true = automatischer Wechsel
                          currentStep={step}
                        />
                      )}
                      {idx === 2 && step >= 3 && (
                        <BewerberFormStep3 
                          formData={formData} 
                          handleChange={handleChange}
                          onChangeStep={(step) => setStepForSelected(step, true)} // true = automatischer Wechsel
                          currentStep={step}
                        />
                      )}
                      {idx === 3 && step >= 4 && <BewerberFormStep4 formData={formData} handleChange={handleChange} />}
                      {idx === 0 && step >= 2 && (
                        <div style={{
                          position: 'absolute',
                          right: '-135px',
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
                          right: '-142px',
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
          {(!selectedId || !aktuellerEintrag) && (
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              height: '400px',
              color: '#bbb',
              fontSize: '18px',
              fontWeight: '500',
            }}>
              Wählen Sie einen Eintrag aus der Tabelle aus
            </div>
          )}
        </main>
      </div>
      
      {/* Agenda Sidebar */}
      <AgendaSidebar 
        eintraege={eintraege}
        isOpen={agendaOpen}
        onToggle={() => setAgendaOpen(!agendaOpen)}
      />
    </div>
  );
};

export default App;
