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

const BewerberFormStep1 = ({ formData, handleChange }) => {
  return (
    <div className="form-step">
      <div className="grid grid-cols-1 gap-4">
        <div className="form-row">
          <label>Vorname</label>
          <input
            name="vorname"
            value={formData.vorname || ''}
            onChange={handleChange}
            className="input"
          />
        </div>
        <div className="form-row">
          <label>Nachname</label>
          <input
            name="nachname"
            value={formData.nachname || ''}
            onChange={handleChange}
            className="input"
          />
        </div>
        <div className="form-row">
          <label>Sprache</label>
          <input
            name="sprache"
            value={formData.sprache || ''}
            onChange={handleChange}
            className="input"
          />
        </div>
        <div className="form-row">
          <label>Telefonnummer</label>
          <input
            name="telefon"
            value={formData.telefon || ''}
            onChange={handleChange}
            className="input"
          />
        </div>
        <div className="form-row">
          <label>E-Mail</label>
          <input
            name="email"
            value={formData.email || ''}
            onChange={handleChange}
            className="input"
          />
        </div>
        <div className="form-row">
          <label>Eigenes Auto</label>
          <select
            name="auto"
            value={formData.auto || ''}
            onChange={handleChange}
            className="input"
          >
            <option value=""> </option>
            <option>Ja, habe ich</option>
            <option>Nur Führerschein, aber kein Auto</option>
            <option>Kein Führerschein, kein Auto</option>
          </select>
        </div>
        <div className="form-row">
          <label>EU-Bürger</label>
          <select
            name="euBuerger"
            value={formData.euBuerger || ''}
            onChange={handleChange}
            className="input"
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
            onChange={handleChange}
            className="input"
          />
        </div>
        <div className="form-row">
          <label>Erhalten</label>
          <select
            name="erhalten"
            value={formData.erhalten || ''}
            onChange={handleChange}
            className="input"
          >
            <option value=""> </option>
            <option>HiTalent</option>
            <option>feibra Jobs</option>
            <option>E-Mail</option>
            <option>Telefonisch</option>
            <option>Persönlich</option>
          </select>
        </div>
        <div className="form-row">
          <label>Kontaktdatum</label>
          <input
            type="date"
            name="kontaktdatum"
            value={formData.kontaktdatum || ''}
            onChange={handleChange}
            className="input"
          />
        </div>
        <div className="form-row">
          <label>Kontaktaufnahme</label>
          <input
            name="kontaktaufnahme"
            value={formData.kontaktaufnahme || ''}
            onChange={handleChange}
            className="input"
          />
        </div>
        <div style={{ height: 18 }} />
        <div className="form-row">
          <label>Anzahl Termine</label>
        </div>
        <div className="form-row">
          <label>Filiale</label>
          <select
            name="filiale"
            value={formData.filiale || ''}
            onChange={handleChange}
            className="input"
            required
          >
            <option value="">Bitte wählen</option>
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
            onChange={handleChange}
            className="input"
          />
        </div>
        <div className="form-row">
          <label>Uhrzeit</label>
          <input
            type="time"
            name="uhrzeitTermin"
            value={formData.uhrzeitTermin || ''}
            onChange={handleChange}
            className="input"
          />
        </div>
        <div className="form-row">
          <label>Kein Termin</label>
          <input
            type="checkbox"
            name="keinTermin"
            checked={!!formData.keinTermin}
            onChange={e =>
              handleChange({
                target: { name: 'keinTermin', value: e.target.checked },
              })
            }
            style={{ width: 18, height: 18 }}
          />
        </div>
        <div className="form-row">
          <label>Grund</label>
          <select
            name="grundTermin"
            value={formData.grundTermin || ''}
            onChange={handleChange}
            className="input"
          >
            <option value=""> </option>
            {GRUENDE.map((g) => (
              <option key={g}>{g}</option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};

export default BewerberFormStep1;
