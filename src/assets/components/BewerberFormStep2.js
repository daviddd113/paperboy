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

const BewerberFormStep2 = ({ formData, handleChange }) => {
  return (
    <div className="form-step">
      <div className="grid grid-cols-1 gap-4">
        <div className="form-row">
          <label>Erschienen</label>
          <select
            name="erschienen"
            value={formData.erschienen || ''}
            onChange={handleChange}
            className="input"
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
            onChange={handleChange}
            className="input"
          />
        </div>
        <div className="form-row">
          <label>Uhrzeit</label>
          <input
            type="time"
            name="uhrzeit"
            value={formData.uhrzeit || ''}
            onChange={handleChange}
            className="input"
          />
        </div>
        <div className="form-row">
          <label>Auftr. übernommen</label>
          <select
            name="auftrag"
            value={formData.auftrag || ''}
            onChange={handleChange}
            className="input"
          >
            <option value=""> </option>
            <option>Ja</option>
            <option>Nein</option>
          </select>
        </div>
        <div className="form-row">
          <label>Grund</label>
          <select
            name="grund"
            value={formData.grund || ''}
            onChange={handleChange}
            className="input"
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
            onChange={handleChange}
            className="input"
          />
        </div>
      </div>
    </div>
  );
};

export default BewerberFormStep2;
