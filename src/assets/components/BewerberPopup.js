import React, { useState } from 'react';

const tabs = [
  'STAMMDATEN',
  'ERREICHBAR',
  'FINANZDATEN',
  'FILIALDATEN',
  'AUFENTHALT',
  'KENNZEICHEN'
];

function AufenthaltstitelPopup({ open, onClose, onSave }) {
  const [titel, setTitel] = useState('');
  const [gueltigVon, setGueltigVon] = useState('');
  const [gueltigBis, setGueltigBis] = useState('');
  const [ausgestellt, setAusgestellt] = useState('');
  if (!open) return null;
  return (
    <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', background: 'rgba(0,0,0,0.18)', zIndex: 3000, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ background: '#fff', borderRadius: 8, width: 420, minHeight: 320, boxShadow: '0 4px 32px #0002', padding: '32px 32px 24px 32px', position: 'relative', display: 'flex', flexDirection: 'column', gap: 18, zIndex: 3010 }}>
        <button onClick={onClose} style={{ position: 'absolute', top: 12, right: 18, background: 'none', border: 'none', fontSize: 26, color: '#888', cursor: 'pointer' }}>×</button>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          <label style={{ fontWeight: 600, fontSize: '0.9rem', marginBottom: 2 }}>AUFENTHALTSTITEL</label>
          <select value={titel} onChange={e => setTitel(e.target.value)} style={{ width: '100%', fontSize: '0.9rem', height: 30 }}>
            <option value=""> </option>
            <option value="Niederlassungsbewilligung">Niederlassungsbewilligung</option>
            <option value="Daueraufenthalt">Daueraufenthalt</option>
            <option value="Aufenthaltsbewilligung">Aufenthaltsbewilligung</option>
            <option value="Rot-Weiß-Rot Karte">Rot-Weiß-Rot Karte</option>
          </select>
          <label style={{ fontWeight: 600, fontSize: '0.9rem', marginTop: 10 }}>GÜLTIG</label>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <span style={{ fontWeight: 500, fontSize: '0.9rem', minWidth: 32, color: '#888' }}>VON</span>
            <input type="date" value={gueltigVon} onChange={e => setGueltigVon(e.target.value)} style={{ width: 140, fontSize: '1rem', height: 28 }} />
            <span style={{ fontWeight: 500, fontSize: '0.9rem', minWidth: 32, marginLeft: 5, color: '#888' }}>BIS</span>
            <input type="date" value={gueltigBis} onChange={e => setGueltigBis(e.target.value)} style={{ width: 140, fontSize: '1rem', height: 28, marginLeft: -10 }} />
          </div>
          <label style={{ fontWeight: 600, fontSize: '0.9rem', marginTop: 10 }}>AUSGESTELLT</label>
          <input type="date" value={ausgestellt} onChange={e => setAusgestellt(e.target.value)} style={{ width: '100%', fontSize: '1rem', height: 28 }} />
        </div>
        <button onClick={() => onSave && onSave({ titel, gueltigVon, gueltigBis, ausgestellt })} style={{ marginTop: 24, background: '#2684ff', color: '#fff', border: 'none', borderRadius: 4, fontSize: 15, fontWeight: 600, padding: '8px 0', cursor: 'pointer' }}>Speichern</button>
      </div>
    </div>
  );
}

function AsylStatusPopup({ open, onClose, onSave }) {
  const [gueltigBis, setGueltigBis] = useState('');
  const [ausgestellt, setAusgestellt] = useState('');
  if (!open) return null;
  return (
    <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', background: 'rgba(0,0,0,0.18)', zIndex: 3000, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ background: '#fff', borderRadius: 8, width: 420, minHeight: 240, boxShadow: '0 4px 32px #0002', padding: '32px 32px 24px 32px', position: 'relative', display: 'flex', flexDirection: 'column', gap: 18, zIndex: 3010 }}>
        <button onClick={onClose} style={{ position: 'absolute', top: 12, right: 18, background: 'none', border: 'none', fontSize: 26, color: '#888', cursor: 'pointer' }}>×</button>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          <label style={{ fontWeight: 600, fontSize: '0.9rem', marginTop: 10 }}>GÜLTIG BIS</label>
          <input type="date" value={gueltigBis} onChange={e => setGueltigBis(e.target.value)} style={{ width: '100%', fontSize: '1rem', height: 28 }} />
          <label style={{ fontWeight: 600, fontSize: '0.9rem', marginTop: 10 }}>AUSGESTELLT</label>
          <input type="date" value={ausgestellt} onChange={e => setAusgestellt(e.target.value)} style={{ width: '100%', fontSize: '1rem', height: 28 }} />
        </div>
        <button onClick={() => onSave && onSave({ gueltigBis, ausgestellt })} style={{ marginTop: 24, background: '#2684ff', color: '#fff', border: 'none', borderRadius: 4, fontSize: 15, fontWeight: 600, padding: '8px 0', cursor: 'pointer' }}>Speichern</button>
      </div>
    </div>
  );
}

function KennzeichenPopup({ open, onClose, onSave }) {
  const [kennzeichen, setKennzeichen] = useState('');
  if (!open) return null;
  return (
    <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', background: 'rgba(0,0,0,0.18)', zIndex: 3000, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ background: '#fff', borderRadius: 8, width: 420, minHeight: 140, boxShadow: '0 4px 32px #0002', padding: '32px 32px 24px 32px', position: 'relative', display: 'flex', flexDirection: 'column', gap: 18, zIndex: 3010 }}>
        <button onClick={onClose} style={{ position: 'absolute', top: 12, right: 18, background: 'none', border: 'none', fontSize: 26, color: '#888', cursor: 'pointer' }}>×</button>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          <label style={{ fontWeight: 600, fontSize: '0.9rem', marginBottom: 2 }}>KENNZEICHEN</label>
          <input value={kennzeichen} onChange={e => setKennzeichen(e.target.value)} style={{ width: '100%', fontSize: '1rem', height: 28 }} />
        </div>
        <button onClick={() => { if (kennzeichen) { onSave && onSave({ kennzeichen }); setKennzeichen(''); }}} style={{ marginTop: 24, background: '#2684ff', color: '#fff', border: 'none', borderRadius: 4, fontSize: 15, fontWeight: 600, padding: '8px 0', cursor: 'pointer' }}>Speichern</button>
      </div>
    </div>
  );
}

const BewerberPopup = ({ open, onClose, onSave, initialNr }) => {
  const [nr, setNr] = useState(initialNr || '');
  const [nachname, setNachname] = useState('');
  const [vorname, setVorname] = useState('');
  const [saved, setSaved] = useState(false);
  const [activeTab, setActiveTab] = useState(0);
  const [showAufenthaltstitelPopup, setShowAufenthaltstitelPopup] = useState(false);
  const [showAsylStatusPopup, setShowAsylStatusPopup] = useState(false);
  const [showKennzeichenPopup, setShowKennzeichenPopup] = useState(false);
  const [asylStatusList, setAsylStatusList] = useState([]);
  const [aufenthaltstitelList, setAufenthaltstitelList] = useState([]); // für spätere Einträge
  const [kennzeichenList, setKennzeichenList] = useState([]);

  function handleSave() {
    setSaved(true);
    if (onSave) onSave(nr);
  }

  if (!open) return null;
  return (
    <div style={{
      position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh',
      background: 'rgba(0,0,0,0.18)', zIndex: 1000, display: 'flex', alignItems: 'flex-start', justifyContent: 'center', paddingTop: 40
    }}>
      <div style={{ background: '#fff', borderRadius: 8, width: 1100, height: 700, boxShadow: '0 4px 32px #0002', padding: 0, position: 'relative', overflow: 'auto' }}>
        <div style={{ display: 'flex', alignItems: 'center', background: '#eaeaea', borderRadius: '8px 8px 0 0', padding: '12px 24px', fontWeight: 700, fontSize: '1.1rem', borderBottom: '1px solid #ccc' }}>
          <div style={{ minWidth: 220 }}>
            {saved && (
              <>
                <span style={{ fontWeight: 700, fontSize: '1.05rem', marginRight: 5 }}>{nr}</span>
                <span style={{ fontWeight: 700, fontSize: '1.05rem', marginRight: 10 }}>{nachname}</span>
                <div style={{ color: '#888', fontWeight: 400, fontSize: '0.95rem', marginTop: 2 }}>{vorname}</div>
              </>
            )}
          </div>
          <div style={{ flex: 1 }} />
          <button onClick={handleSave} style={{ background: '#2684ff', color: '#fff', border: 'none', borderRadius: 4, fontSize: 15, fontWeight: 600, padding: '6px 18px', marginRight: 12, cursor: 'pointer' }}>Speichern</button>
          <button onClick={onClose} style={{ background: 'none', border: 'none', fontSize: 22, cursor: 'pointer', color: '#888' }}>×</button>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', background: '#f7f7f7', borderBottom: '1px solid #ccc', padding: '0 24px', height: 38 }}>
          <div style={{ display: 'flex', gap: 18 }}>
            {tabs.map((tab, idx) => (
              <button
                key={tab}
                onClick={() => setActiveTab(idx)}
                style={{
                  background: 'none',
                  border: 'none',
                  fontWeight: idx === activeTab ? 600 : 400,
                  color: idx === activeTab ? '#222' : '#888',
                  fontSize: 13,
                  borderBottom: idx === activeTab ? '2px solid #bfc4c9' : 'none',
                  padding: '0 8px',
                  cursor: 'pointer'
                }}
              >
                {tab}
              </button>
            ))}
          </div>
          <div style={{ flex: 1 }} />
        </div>
        <div style={{ padding: '24px 32px', display: 'flex', flexDirection: 'column', gap: 18 }}>
          {activeTab === 0 && (
            <div style={{ display: 'flex', gap: 12 }}>
              <div style={{ minWidth: 340 }}>
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: 14 }}>
                  <label style={{ fontWeight: 600, fontSize: '0.8rem', minWidth: 90 }}>NACHNAME</label>
                  <input style={{ width: 180, fontSize: '0.8rem', height: 22 }} value={nachname} onChange={e => setNachname(e.target.value)} />
                </div>
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: 14 }}>
                  <label style={{ fontWeight: 600, fontSize: '0.8rem', minWidth: 90 }}>VORNAME</label>
                  <input style={{ width: 180, fontSize: '0.8rem', height: 22 }} value={vorname} onChange={e => setVorname(e.target.value)} />
                </div>
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: 14 }}>
                  <label style={{ fontWeight: 600, fontSize: '0.8rem', minWidth: 90 }}>FIRMA</label>
                  <input style={{ width: 180, fontSize: '0.8rem', height: 22 }} />
                </div>
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: 14 }}>
                  <label style={{ fontWeight: 600, fontSize: '0.8rem', minWidth: 90 }}>ANREDE</label>
                  <input style={{ width: 120, fontSize: '0.8rem', height: 22 }} />
                </div>
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: 14 }}>
                  <label style={{ fontWeight: 600, fontSize: '0.8rem', minWidth: 90 }}>TITEL</label>
                  <input style={{ width: 120, fontSize: '0.8rem', height: 22 }} />
                </div>
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: 14 }}>
                  <label style={{ fontWeight: 600, fontSize: '0.8rem', minWidth: 90 }}>NR</label>
                  <input style={{ width: 120, fontSize: '0.8rem', height: 22 }} value={nr} onChange={e => setNr(e.target.value)} />
                </div>
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: 14 }}>
                  <label style={{ fontWeight: 600, fontSize: '0.8rem', minWidth: 90 }}>NATION</label>
                  <input style={{ width: 120, fontSize: '0.8rem', height: 22 }} />
                </div>
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: 14 }}>
                  <label style={{ fontWeight: 600, fontSize: '0.8rem', minWidth: 90 }}>GEBURTSTAG</label>
                  <input type="date" style={{ width: 120, fontSize: '0.8rem', height: 22 }} />
                </div>
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: 14 }}>
                  <label style={{ fontWeight: 600, fontSize: '0.8rem', minWidth: 90 }}>GEBURTSORT</label>
                  <input style={{ width: 180, fontSize: '0.8rem', height: 22 }} />
                </div>
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: 14 }}>
                  <label style={{ fontWeight: 600, fontSize: '0.8rem', minWidth: 90 }}>BEMERKUNG</label>
                  <input style={{ width: 220, fontSize: '0.8rem', height: 22 }} />
                </div>
              </div>
              <div style={{ minWidth: 260, flex: 1 }}>
                <div style={{ fontWeight: 700, color: '#888', marginBottom: 14, fontSize: '0.8rem' }}>IDENTITÄT</div>
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: 14 }}>
                  <label style={{ fontWeight: 600, fontSize: '0.8rem', minWidth: 90 }}>IDENTITÄTS-NACHWEIS</label>
                  <input style={{ width: 220, fontSize: '0.8rem', height: 22 }} />
                </div>
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: 14 }}>
                  <label style={{ fontWeight: 600, fontSize: '0.8rem', minWidth: 90 }}>AUSWEIS</label>
                  <input style={{ width: 180, fontSize: '0.8rem', height: 22 }} />
                </div>
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: 14 }}>
                  <label style={{ fontWeight: 600, fontSize: '0.8rem', minWidth: 90 }}>AUSWEIS NR.</label>
                  <input style={{ width: 180, fontSize: '0.8rem', height: 22 }} />
                </div>
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: 14 }}>
                  <label style={{ fontWeight: 600, fontSize: '0.8rem', minWidth: 90 }}>AUSGESTELLT AM</label>
                  <input type="date" style={{ width: 120, fontSize: '0.8rem', height: 22 }} />
                </div>
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: 14 }}>
                  <label style={{ fontWeight: 600, fontSize: '0.8rem', minWidth: 90 }}>AUSSTELLUNGSORT</label>
                  <input style={{ width: 180, fontSize: '0.8rem', height: 22 }} />
                </div>
              </div>
            </div>
          )}
          {activeTab === 1 && (
            <div style={{ display: 'flex', gap: 32 }}>
              <div style={{ minWidth: 340 }}>
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: 14 }}>
                  <label style={{ fontWeight: 600, fontSize: '0.8rem', minWidth: 90 }}>TEL 1</label>
                  <input style={{ width: 180, fontSize: '0.8rem', height: 22 }} />
                </div>
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: 14 }}>
                  <label style={{ fontWeight: 600, fontSize: '0.8rem', minWidth: 90 }}>TEL 2</label>
                  <input style={{ width: 180, fontSize: '0.8rem', height: 22 }} />
                </div>
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: 14 }}>
                  <label style={{ fontWeight: 600, fontSize: '0.8rem', minWidth: 90 }}>FAX</label>
                  <input style={{ width: 180, fontSize: '0.8rem', height: 22 }} />
                </div>
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: 14 }}>
                  <label style={{ fontWeight: 600, fontSize: '0.8rem', minWidth: 90 }}>EMAIL</label>
                  <input style={{ width: 180, fontSize: '0.8rem', height: 22, textDecoration: 'underline', color: '#2684ff' }} />
                </div>
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: 14 }}>
                  <label style={{ fontWeight: 600, fontSize: '0.8rem', minWidth: 90 }}>LAND</label>
                  <input style={{ width: 120, fontSize: '0.8rem', height: 22 }} />
                </div>
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: 14 }}>
                  <label style={{ fontWeight: 600, fontSize: '0.8rem', minWidth: 90 }}>PLZ</label>
                  <input style={{ width: 120, fontSize: '0.8rem', height: 22 }} />
                </div>
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: 14 }}>
                  <label style={{ fontWeight: 600, fontSize: '0.8rem', minWidth: 90 }}>ORT</label>
                  <input style={{ width: 180, fontSize: '0.8rem', height: 22 }} />
                </div>
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: 14 }}>
                  <label style={{ fontWeight: 600, fontSize: '0.8rem', minWidth: 90 }}>STRASSE</label>
                  <input style={{ width: 180, fontSize: '0.8rem', height: 22 }} />
                </div>
              </div>
              <div style={{ minWidth: 260, flex: 1 }}>
                <div style={{ fontWeight: 700, color: '#888', marginBottom: 14, fontSize: '0.9rem', marginTop: 8 }}>ZUSTELLADRESSE</div>
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: 14 }}>
                  <label style={{ fontWeight: 600, fontSize: '0.8rem', minWidth: 90 }}>LAND</label>
                  <input style={{ width: 120, fontSize: '0.8rem', height: 22 }} />
                </div>
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: 14 }}>
                  <label style={{ fontWeight: 600, fontSize: '0.8rem', minWidth: 90 }}>PLZ</label>
                  <input style={{ width: 120, fontSize: '0.8rem', height: 22 }} />
                </div>
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: 14 }}>
                  <label style={{ fontWeight: 600, fontSize: '0.8rem', minWidth: 90 }}>ORT</label>
                  <input style={{ width: 180, fontSize: '0.8rem', height: 22 }} />
                </div>
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: 14 }}>
                  <label style={{ fontWeight: 600, fontSize: '0.8rem', minWidth: 90 }}>STRASSE</label>
                  <input style={{ width: 180, fontSize: '0.8rem', height: 22 }} />
                </div>
                <div style={{ display: 'flex', alignItems: 'flex-start', marginBottom: 14 }}>
                  <label style={{ fontWeight: 600, fontSize: '0.8rem', minWidth: 90, marginTop: 2 }}>BEMERKUNG</label>
                  <input style={{ width: 220, fontSize: '0.8rem', height: 40 }} />
                </div>
              </div>
            </div>
          )}
          {activeTab === 2 && (
            <div style={{ display: 'flex', gap: 32 }}>
              <div style={{ minWidth: 340, flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: 14 }}>
                  <label style={{ fontWeight: 600, fontSize: '0.8rem', minWidth: 80 }}>MELDEDATEN</label>
                  <input style={{ width: 220, fontSize: '0.8rem', height: 22 }} />
                  <label style={{ fontWeight: 600, fontSize: '0.8rem', minWidth: 70, marginLeft: 10 }}>MELDEDATEN AM</label>
                  <input type="date" style={{ width: 120, fontSize: '0.8rem', height: 22, marginLeft: 16 }} />
                </div>
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: 14 }}>
                  <label style={{ fontWeight: 600, fontSize: '0.8rem', minWidth: 80 }}>BANK</label>
                  <input style={{ width: 220, fontSize: '0.8rem', height: 22 }} />
                  <label style={{ fontWeight: 600, fontSize: '0.8rem', minWidth: 30, marginLeft: 10 }}>BLZ</label>
                  <input style={{ width: 120, fontSize: '0.8rem', height: 22 }} />
                </div>
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: 14 }}>
                  <label style={{ fontWeight: 600, fontSize: '0.8rem', minWidth: 80 }}>KONTONR.</label>
                  <input style={{ width: 220, fontSize: '0.8rem', height: 22 }} />
                </div>
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: 14 }}>
                  <label style={{ fontWeight: 600, fontSize: '0.8rem', minWidth: 80 }}>IBAN</label>
                  <input style={{ width: 220, fontSize: '0.8rem', height: 22 }} />
                </div>
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: 14 }}>
                  <label style={{ fontWeight: 600, fontSize: '0.8rem', minWidth: 80 }}>BIC</label>
                  <input style={{ width: 220, fontSize: '0.8rem', height: 22 }} />
                </div>
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: 14 }}>
                  <label style={{ fontWeight: 600, fontSize: '0.8rem', minWidth: 80 }}>UID</label>
                  <input style={{ width: 220, fontSize: '0.8rem', height: 22, marginBottom: 18 }} />
                </div>
                {/* Neue Felder mit großem Abstand darunter */}
                <div style={{ marginTop: 36 }}>
                  <div style={{ display: 'flex', alignItems: 'center', marginBottom: 18 }}>
                    <label style={{ fontWeight: 600, fontSize: '0.8rem', minWidth: 10 }}>AUSZAHLUNGSMODUS</label>
                    <select style={{ width: 240, fontSize: '0.8rem', height: 24, lineHeight: '1', padding: '0 6px', boxSizing: 'border-box' }}>
                      <option value=""> </option>
                      <option value="monatlich">Monatlich</option>
                      <option value="wöchentlich">Wöchentlich</option>
                    </select>
                  </div>
                  <hr style={{ width: '100%', border: 'none', borderTop: '1px solid #e0e0e0', margin: '12px 0' }} />
                  <div style={{ display: 'flex', alignItems: 'center', marginBottom: 18 }}>
                    <label style={{ fontWeight: 600, fontSize: '0.8rem', minWidth: 10 }}>AUSZAHLUNGSART</label>
                    <select style={{ width: 240, fontSize: '0.8rem', height: 24, lineHeight: '1', padding: '0 6px', boxSizing: 'border-box' }}>
                      <option value=""> </option>
                      <option value="scheck">Scheck</option>
                      <option value="ueberweisung">Überweisung</option>
                    </select>
                  </div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', marginBottom: 18, gap: 8, maxWidth: 520, justifyContent: 'flex-start' }}>
                    <label style={{ fontSize: '0.8rem', color:'#888', display: 'flex', alignItems: 'center', gap: 4, width: '40%', justifyContent: 'flex-start' }}><input type="checkbox" />FIRMA</label>
                    <label style={{ fontSize: '0.8rem', color:'#888', display: 'flex', alignItems: 'center', gap: 4, width: '40%', justifyContent: 'flex-start' }}><input type="checkbox" />REVERSE CHARGE</label>
                    <label style={{ fontSize: '0.8rem', color:'#888', display: 'flex', alignItems: 'center', gap: 4, width: '40%', justifyContent: 'flex-start' }}><input type="checkbox" />KEINE WERBE-PAUSE</label>
                    <label style={{ fontSize: '0.8rem', color:'#888', display: 'flex', alignItems: 'center', gap: 4, width: '40%', justifyContent: 'flex-start' }}><input type="checkbox" />KEINE ERSTBEZAHLUNG</label>
                  </div>
                  <hr style={{ width: '100%', border: 'none', borderTop: '1px solid #e0e0e0', margin: '12px 0' }} />
                  <div style={{ display: 'flex', alignItems: 'center', marginBottom: 4 }}>
                    <label style={{ fontWeight: 600, fontSize: '0.8rem', minWidth: 10 }}>STATUS</label>
                  </div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', marginBottom: 18, gap: 8, maxWidth: 520, justifyContent: 'flex-start' }}>
                    <label style={{ fontSize: '0.8rem', color:'#888', display: 'flex', alignItems: 'center', gap: 4, width: '40%', justifyContent: 'flex-start' }}><input type="checkbox" />VERTEILER*INNEN</label>
                    <label style={{ fontSize: '0.8rem', color:'#888', display: 'flex', alignItems: 'center', gap: 4, width: '40%', justifyContent: 'flex-start' }}><input type="checkbox" />KONTROLLOR*INNEN</label>
                    <label style={{ fontSize: '0.8rem', color:'#888', display: 'flex', alignItems: 'center', gap: 4, width: '40%', justifyContent: 'flex-start' }}><input type="checkbox" />ZUSTELLER*INNEN</label>
                    <label style={{ fontSize: '0.8rem', color:'#888', display: 'flex', alignItems: 'center', gap: 4, width: '40%', justifyContent: 'flex-start' }}><input type="checkbox" />UNADR. VERTEILER*INNEN</label>
                    <label style={{ fontSize: '0.8rem', color:'#888', display: 'flex', alignItems: 'center', gap: 4, width: '40%', justifyContent: 'flex-start' }}><input type="checkbox" />ADR. VERTEILER*INNEN</label>
                    <label style={{ fontSize: '0.8rem', color:'#888', display: 'flex', alignItems: 'center', gap: 4, width: '40%', justifyContent: 'flex-start' }}><input type="checkbox" />IST AUSGEBLENDET</label>
                  </div>
                </div>
              </div>
              <div style={{ minWidth: 100, flex: 1 }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                  <div style={{ display: 'flex', alignItems: 'center', marginBottom: 8}}>
                    <label style={{ fontWeight: 600, fontSize: '0.8rem', minWidth: 120 }}>WERBER*INNEN U-ADR.</label>
                    <select style={{ width: 180, fontSize: '0.8rem', height: 22, marginLeft: 32 }}><option value=""></option></select>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', marginBottom: 8 }}>
                    <label style={{ fontWeight: 600, fontSize: '0.8rem', minWidth: 120 }}>WERBER*INNEN ADR.</label>
                    <select style={{ width: 180, fontSize: '0.8rem', height: 22, marginLeft: 32 }}><option value=""></option></select>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', marginBottom: 8 }}>
                    <label style={{ fontWeight: 600, fontSize: '0.8rem', minWidth: 120 }}>AUFNAHME-FIL</label>
                    <select style={{ width: 180, fontSize: '0.8rem', height: 22, marginLeft: 32 }}><option value=""></option></select>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', marginBottom: 8 }}>
                    <label style={{ fontWeight: 600, fontSize: '0.8rem', minWidth: 120 }}>TÄTIG SEIT</label>
                    <input type="date" style={{ width: 120, fontSize: '0.8rem', height: 22, marginLeft: 32 }} />
                    <label style={{ fontWeight: 600, fontSize: '0.8rem', minWidth: 40, marginLeft: 18 }}>BIS</label>
                    <input type="date" style={{ width: 120, fontSize: '0.8rem', height: 22, marginLeft: 8 }} />
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', marginBottom: 8 }}>
                    <label style={{ fontWeight: 600, fontSize: '0.8rem', minWidth: 120 }}>FAHRSPESEN CODE</label>
                    <input style={{ width: 120, fontSize: '0.8rem', height: 22, marginLeft: 32 }} />
                  </div>
                </div>
              </div>
            </div>
          )}
          {activeTab === 3 && (
            <div style={{ display: 'flex', gap: 80, marginTop: 24 }}>
              <div>
                <div style={{ color: '#888', fontWeight: 600, fontSize: '1rem', marginBottom: 6, letterSpacing: 0.5 }}>UNADRESSIERTE FILIALEN</div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 2, marginLeft: 8 }}>
                  {['Fil01','Fil02','Fil03','Fil05','Fil06','Fil07','Fil08','Fil09','Fil10','Fil13','Fil15'].map(fil => (
                    <label key={fil} style={{ color: '#888', fontSize: '0.95rem', fontWeight: 400, display: 'flex', alignItems: 'center', gap: 0 }}>
                      <input type="checkbox" />{fil}
                    </label>
                  ))}
                </div>
              </div>
              <div>
                <div style={{ color: '#888', fontWeight: 600, fontSize: '1rem', marginBottom: 6, letterSpacing: 0.5 }}>ADRESSIERTE FILIALEN</div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 2, marginLeft: 8 }}>
                  {['Fil01','Fil02','Fil03','Fil05','Fil06','Fil07','Fil08','Fil09','Fil10','Fil13','Fil15'].map(fil => (
                    <label key={fil} style={{ color: '#888', fontSize: '0.95rem', fontWeight: 400, display: 'flex', textAlign: 'start', alignItems: 'center', gap: 0 }}>
                      <input type="checkbox" />{fil}
                    </label>
                  ))}
                </div>
              </div>
            </div>
          )}
          {activeTab === 4 && (
            <div style={{ width: '100%', marginTop: 8 }}>
              {/* Aufenthaltstitel Tabelle */}
              <div style={{ marginBottom: 32, position: 'relative' }}>
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: 4 }}>
                  <div style={{ color: '#888', fontWeight: 600, fontSize: '1.1rem', flex: 1 }}>AUFENTHALTSTITEL</div>
                  <button onClick={() => setShowAufenthaltstitelPopup(true)} style={{ display: 'flex', alignItems: 'center', background: 'none', border: 'none', color: '#888', fontWeight: 600, fontSize: 16, cursor: 'pointer', marginLeft: 12 }}>
                    <span style={{ fontSize: 26, fontWeight: 400, marginRight: 4, lineHeight: 1 }}>+</span> HINZUFÜGEN
                  </button>
                </div>
                <table style={{ width: '100%', borderCollapse: 'collapse', background: 'none' }}>
                  <thead>
                    <tr style={{ borderBottom: '1px solid #e0e0e0' }}>
                      <th style={{ color: '#2684ff', fontWeight: 600, fontSize: '0.9rem', textAlign: 'left', padding: '6px 12px' }}>AUFENTHALTS_TITEL</th>
                      <th style={{ color: '#2684ff', fontWeight: 600, fontSize: '0.9rem', textAlign: 'left', padding: '6px 12px' }}>GUELTIG_VON</th>
                      <th style={{ color: '#2684ff', fontWeight: 600, fontSize: '0.9rem', textAlign: 'left', padding: '6px 12px' }}>GUELTIG_BIS</th>
                      <th style={{ color: '#2684ff', fontWeight: 600, fontSize: '0.9rem', textAlign: 'left', padding: '6px 12px' }}>AUSGESTELLT</th>
                      <th style={{ color: '#2684ff', fontWeight: 600, fontSize: '0.9rem', textAlign: 'left', padding: '6px 12px' }}>ERSTELLER*IN</th>
                      <th style={{ color: '#2684ff', fontWeight: 600, fontSize: '0.9rem', textAlign: 'left', padding: '6px 12px' }}>ERSTELLT</th>
                      <th style={{ width: 40 }}></th>
                    </tr>
                  </thead>
                  <tbody>
                    {aufenthaltstitelList.map((row, idx) => (
                      <React.Fragment key={idx}>
                        <tr>
                          <td style={{ padding: '6px 12px' }}>{row.titel}</td>
                          <td style={{ padding: '6px 12px' }}>{row.gueltigVon}</td>
                          <td style={{ padding: '6px 12px' }}>{row.gueltigBis}</td>
                          <td style={{ padding: '6px 12px' }}>{row.ausgestellt}</td>
                          <td style={{ padding: '6px 12px' }}>Du</td>
                          <td style={{ padding: '6px 12px' }}>{row.erstellt}</td>
                          <td style={{ padding: '6px 0', textAlign: 'center' }}>
                            <button onClick={() => setAufenthaltstitelList(list => list.filter((_, i) => i !== idx))} style={{ background: 'none', border: 'none', color: '#d00', fontSize: 18, cursor: 'pointer' }}>×</button>
                          </td>
                        </tr>
                        <tr><td colSpan={7}><hr style={{ border: 'none', borderTop: '1px solid #e0e0e0', margin: 0 }} /></td></tr>
                      </React.Fragment>
                    ))}
                  </tbody>
                </table>
                <AufenthaltstitelPopup 
                  open={showAufenthaltstitelPopup} 
                  onClose={() => setShowAufenthaltstitelPopup(false)} 
                  onSave={({ titel, gueltigVon, gueltigBis, ausgestellt }) => {
                    const heute = new Date().toISOString().slice(0, 10);
                    setAufenthaltstitelList(list => [...list, { titel, gueltigVon, gueltigBis, ausgestellt, erstellt: heute }]);
                    setShowAufenthaltstitelPopup(false);
                  }} 
                />
              </div>
              {/* Asyl-Status Tabelle */}
              <div style={{ position: 'relative' }}>
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: 4, paddingTop: 150 }}>
                  <div style={{ color: '#888', fontWeight: 600, fontSize: '1.1rem', flex: 1 }}>ASYL-STATUS</div>
                  <button onClick={() => setShowAsylStatusPopup(true)} style={{ display: 'flex', alignItems: 'center', background: 'none', border: 'none', color: '#888', fontWeight: 600, fontSize: 16, cursor: 'pointer', marginLeft: 12 }}>
                    <span style={{ fontSize: 26, fontWeight: 400, marginRight: 4, lineHeight: 1 }}>+</span> HINZUFÜGEN
                  </button>
                </div>
                <table style={{ width: '100%', borderCollapse: 'collapse', background: 'none' }}>
                  <thead>
                    <tr style={{ borderBottom: '1px solid #e0e0e0' }}>
                      {/* <th style={{ color: '#2684ff', fontWeight: 600, fontSize: '0.9rem', textAlign: 'left', padding: '6px 12px' }}>ASYL-STATUS</th> */}
                      <th style={{ color: '#2684ff', fontWeight: 600, fontSize: '0.9rem', textAlign: 'left', padding: '6px 12px' }}>GUELTIG_BIS</th>
                      <th style={{ color: '#2684ff', fontWeight: 600, fontSize: '0.9rem', textAlign: 'left', padding: '6px 12px' }}>AUSGESTELLT</th>
                      <th style={{ color: '#2684ff', fontWeight: 600, fontSize: '0.9rem', textAlign: 'left', padding: '6px 12px' }}>ERSTELLER*IN</th>
                      <th style={{ color: '#2684ff', fontWeight: 600, fontSize: '0.9rem', textAlign: 'left', padding: '6px 12px' }}>ERSTELLT</th>
                      <th style={{ width: 40 }}></th>
                    </tr>
                  </thead>
                  <tbody>
                    {asylStatusList.map((row, idx) => (
                      <React.Fragment key={idx}>
                        <tr>
                          {/* <td style={{ padding: '6px 12px' }}>{row.status}</td> */}
                          <td style={{ padding: '6px 12px' }}>{row.gueltigBis}</td>
                          <td style={{ padding: '6px 12px' }}>{row.ausgestellt}</td>
                          <td style={{ padding: '6px 12px' }}>Du</td>
                          <td style={{ padding: '6px 12px' }}>{row.erstellt}</td>
                          <td style={{ padding: '6px 0', textAlign: 'center' }}>
                            <button onClick={() => setAsylStatusList(list => list.filter((_, i) => i !== idx))} style={{ background: 'none', border: 'none', color: '#d00', fontSize: 18, cursor: 'pointer' }}>×</button>
                          </td>
                        </tr>
                        <tr><td colSpan={5}><hr style={{ border: 'none', borderTop: '1px solid #e0e0e0', margin: 0 }} /></td></tr>
                      </React.Fragment>
                    ))}
                  </tbody>
                </table>
                <AsylStatusPopup 
                  open={showAsylStatusPopup} 
                  onClose={() => setShowAsylStatusPopup(false)} 
                  onSave={({ gueltigBis, ausgestellt }) => {
                    const heute = new Date().toISOString().slice(0, 10);
                    setAsylStatusList(list => [...list, { gueltigBis, ausgestellt, erstellt: heute }]);
                    setShowAsylStatusPopup(false);
                  }} 
                />
              </div>
            </div>
          )}
          {activeTab === 5 && (
            <div style={{ width: '100%', marginTop: 8 }}>
              <div style={{ marginBottom: 32, position: 'relative' }}>
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: 4 }}>
                  <div style={{ color: '#888', fontWeight: 600, fontSize: '1.1rem', flex: 1 }}>KENNZEICHEN</div>
                  <button onClick={() => setShowKennzeichenPopup(true)} style={{ display: 'flex', alignItems: 'center', background: 'none', border: 'none', color: '#888', fontWeight: 600, fontSize: 16, cursor: 'pointer', marginLeft: 12 }}>
                    <span style={{ fontSize: 26, fontWeight: 400, marginRight: 4, lineHeight: 1 }}>+</span> HINZUFÜGEN
                  </button>
                </div>
                <table style={{ width: '100%', borderCollapse: 'collapse', background: 'none' }}>
                  <thead>
                    <tr style={{ borderBottom: '1px solid #e0e0e0' }}>
                      <th style={{ color: '#2684ff', fontWeight: 600, fontSize: '0.9rem', textAlign: 'left', padding: '6px 12px' }}>KENNZEICHEN</th>
                      <th style={{ color: '#2684ff', fontWeight: 600, fontSize: '0.9rem', textAlign: 'left', padding: '6px 12px' }}>ERSTELLER*IN</th>
                      <th style={{ color: '#2684ff', fontWeight: 600, fontSize: '0.9rem', textAlign: 'left', padding: '6px 12px' }}>ERSTELLT</th>
                      <th style={{ width: 40 }}></th>
                    </tr>
                  </thead>
                  <tbody>
                    {kennzeichenList.map((row, idx) => (
                      <React.Fragment key={idx}>
                        <tr>
                          <td style={{ padding: '6px 12px' }}>{row.kennzeichen}</td>
                          <td style={{ padding: '6px 12px' }}>Du</td>
                          <td style={{ padding: '6px 12px' }}>{row.erstellt}</td>
                          <td style={{ padding: '6px 0', textAlign: 'center' }}>
                            <button onClick={() => setKennzeichenList(list => list.filter((_, i) => i !== idx))} style={{ background: 'none', border: 'none', color: '#d00', fontSize: 18, cursor: 'pointer' }}>×</button>
                          </td>
                        </tr>
                        <tr><td colSpan={4}><hr style={{ border: 'none', borderTop: '1px solid #e0e0e0', margin: 0 }} /></td></tr>
                      </React.Fragment>
                    ))}
                  </tbody>
                </table>
                <KennzeichenPopup 
                  open={showKennzeichenPopup} 
                  onClose={() => setShowKennzeichenPopup(false)} 
                  onSave={({ kennzeichen }) => {
                    const heute = new Date().toISOString().slice(0, 10);
                    setKennzeichenList(list => [...list, { kennzeichen, erstellt: heute }]);
                    setShowKennzeichenPopup(false);
                  }} 
                />
              </div>
            </div>
          )}
          {activeTab !== 0 && activeTab !== 1 && activeTab !== 2 && activeTab !== 3 && activeTab !== 4 && activeTab !== 5 && (
            <div style={{ color: '#888', fontSize: '1.1rem', textAlign: 'center', marginTop: 80 }}>
              Noch kein Inhalt für diesen Reiter.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BewerberPopup;
