import React, { useState } from 'react';
import { format } from 'date-fns';
import { useRef, useEffect } from 'react';
import * as ExcelJS from 'exceljs';
import logo from '../../assets/images/Logo_invertiert_transparent.png'; // Korrekter Pfad zum Logo
import feibraLogo from '../../assets/images/feibra-logo-small.png'; // Feibra Logo importieren

const HeaderBar = ({ count, onNeu, eintraege, onFilterChange }) => {
  const [filterTypes, setFilterTypes] = useState([
    'status', '', '', ''
  ]);
  const [filterValues, setFilterValues] = useState(['Offen', '', '', '']);
  const [showPrintPopup, setShowPrintPopup] = useState(false);
  const [printData, setPrintData] = useState([]);

  // Verfügbare Typen für jede Box (bereits gewählte Typen deaktivieren)
  function getAvailableTypes(idx) {
    return filterOptions.map(opt => ({
      ...opt,
      disabled: filterTypes.includes(opt.value) && filterTypes[idx] !== opt.value
    }));
  }

  // Filter-Logik implementieren
  useEffect(() => {
    const filteredEintraege = applyFilters(eintraege);
    if (onFilterChange) {
      onFilterChange(filteredEintraege);
    }
  }, [filterTypes, filterValues, eintraege, onFilterChange]);

  // Filter anwenden
  const applyFilters = (entries) => {
    return entries.filter(entry => {
      const formData = entry.formData;
      
      // Durch alle aktiven Filter iterieren
      for (let i = 0; i < filterTypes.length; i++) {
        const type = filterTypes[i];
        const value = filterValues[i];
        
        if (!type || !value) continue;
        
        // Status-Filter
        if (type === 'status') {
          if (value === 'Offen') {
            // Alle Steps außer Step 4
            if (entry.step === 4) return false;
          } else if (value === 'Status 1') {
            if (entry.step !== 1) return false;
          } else if (value === 'Status 2') {
            if (entry.step !== 2) return false;
          } else if (value === 'Status 3') {
            if (entry.step !== 3) return false;
          } else if (value === 'Status 4') {
            if (entry.step !== 4) return false;
          }
        }
        
        // Kontaktdatum-Filter
        else if (type === 'datum') {
          if (!formData.kontaktdatum) return false;
          
          const kontaktdatum = new Date(formData.kontaktdatum);
          const heute = new Date();
          heute.setHours(0, 0, 0, 0);
          
          if (value === 'Heute') {
            const istHeute = kontaktdatum.toDateString() === heute.toDateString();
            if (!istHeute) return false;
          } else if (value === 'Morgen') {
            const morgen = new Date(heute);
            morgen.setDate(heute.getDate() + 1);
            const istMorgen = kontaktdatum.toDateString() === morgen.toDateString();
            if (!istMorgen) return false;
          } else if (value === 'Diese Woche') {
            const wocheStart = new Date(heute);
            const wocheEnde = new Date(heute);
            wocheStart.setDate(heute.getDate() - heute.getDay());
            wocheEnde.setDate(wocheStart.getDate() + 6);
            if (kontaktdatum < wocheStart || kontaktdatum > wocheEnde) return false;
          } else if (value.includes(' - ')) {
            // Datumsbereich
            const [vonStr, bisStr] = value.split(' - ');
            const von = parseGermanDate(vonStr);
            const bis = parseGermanDate(bisStr);
            if (kontaktdatum < von || kontaktdatum > bis) return false;
          }
        }
        
        // Termin/Infotag-Filter
        else if (type === 'termin') {
          const terminDatum = formData.datumTermin ? new Date(formData.datumTermin) : null;
          const infotagDatum = formData.infotag ? new Date(formData.infotag) : null;
          
          if (!terminDatum && !infotagDatum) return false;
          
          const heute = new Date();
          heute.setHours(0, 0, 0, 0);
          
          const checkDate = terminDatum || infotagDatum;
          
          if (value === 'Heute') {
            const istHeute = checkDate.toDateString() === heute.toDateString();
            if (!istHeute) return false;
          } else if (value === 'Morgen') {
            const morgen = new Date(heute);
            morgen.setDate(heute.getDate() + 1);
            const istMorgen = checkDate.toDateString() === morgen.toDateString();
            if (!istMorgen) return false;
          } else if (value === 'Diese Woche') {
            const wocheStart = new Date(heute);
            const wocheEnde = new Date(heute);
            wocheStart.setDate(heute.getDate() - heute.getDay());
            wocheEnde.setDate(wocheStart.getDate() + 6);
            if (checkDate < wocheStart || checkDate > wocheEnde) return false;
          } else if (value.includes(' - ')) {
            // Datumsbereich
            const [vonStr, bisStr] = value.split(' - ');
            const von = parseGermanDate(vonStr);
            const bis = parseGermanDate(bisStr);
            if (checkDate < von || checkDate > bis) return false;
          }
        }
        
        // Filiale-Filter
        else if (type === 'filiale') {
          if (formData.filiale !== value) return false;
        }
      }
      
      return true;
    });
  };

  // Hilfsfunktion für deutsches Datumsformat
  const parseGermanDate = (dateStr) => {
    const [day, month, year] = dateStr.split('.');
    return new Date(year, month - 1, day);
  };

  function handleTypeChange(idx, value) {
    const newTypes = [...filterTypes];
    newTypes[idx] = value;
    setFilterTypes(newTypes);
    // Reset value if type changes
    const newVals = [...filterValues];
    newVals[idx] = '';
    setFilterValues(newVals);
  }

  function handleValueChange(idx, value) {
    const newVals = [...filterValues];
    newVals[idx] = value;
    setFilterValues(newVals);
  }

  function DateRangePickerBox({ idx, filterValues, handleValueChange }) {
    const [showPicker, setShowPicker] = useState(true);
    const pickerRef = useRef(null);
    useEffect(() => {
      function handleClickOutside(event) {
        if (pickerRef.current && !pickerRef.current.contains(event.target)) {
          setShowPicker(false);
        }
      }
      if (showPicker) {
        document.addEventListener('mousedown', handleClickOutside);
      } else {
        document.removeEventListener('mousedown', handleClickOutside);
      }
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [showPicker]);
    if (!showPicker) return null;
    return (
      <div
        ref={pickerRef}
        style={{
          border: '1px solid #bfc4c9',
          borderRadius: 6,
          padding: '8px 10px',
          marginTop: 8,
          display: 'flex',
          alignItems: 'center',
          gap: 8,
          background: '#fff',
          flexDirection: 'row',
          width: 'max-content',
          position: 'absolute',
          zIndex: 9999
        }}
      >
        <label style={{fontSize:'0.8em',color:'#888',marginRight:2}}>Von</label>
        <input
          className="input no-border"
          type="date"
          style={{width:'90px'}}
          value={filterValues[idx + '_von'] || ''}
          onChange={e => {
            const von = e.target.value;
            const bis = (filterValues[idx + '_bis'] || '');
            if (von && bis) {
              const vonStr = format(new Date(von), 'dd.MM.yyyy');
              const bisStr = format(new Date(bis), 'dd.MM.yyyy');
              handleValueChange(idx, vonStr + ' - ' + bisStr);
            } else {
              handleValueChange(idx, 'Freie Auswahl');
              handleValueChange(idx + '_von', von);
            }
          }}
        />
        <label style={{fontSize:'0.8em',color:'#888',margin:'0 2px 0 6px'}}>Bis</label>
        <input
          className="input no-border"
          type="date"
          style={{width:'90px'}}
          value={filterValues[idx + '_bis'] || ''}
          onChange={e => {
            const bis = e.target.value;
            const von = (filterValues[idx + '_von'] || '');
            if (von && bis) {
              const vonStr = format(new Date(von), 'dd.MM.yyyy');
              const bisStr = format(new Date(bis), 'dd.MM.yyyy');
              handleValueChange(idx, vonStr + ' - ' + bisStr);
            } else {
              handleValueChange(idx, 'Freie Auswahl');
              handleValueChange(idx + '_bis', bis);
            }
          }}
        />
      </div>
    );
  }

  function renderValueDropdown(type, idx) {
    if (!type) return (
      <select className="input no-border" disabled style={{width: '150px'}}><option value=""></option></select>
    );
    if (type === 'status') {
      return (
        <select className="input no-border" value={filterValues[idx] || (idx === 0 ? 'Offen' : '')} onChange={e => handleValueChange(idx, e.target.value)} style={{width: '150px'}}>
          <option value=""></option>
          {statusOptions.map(opt => <option key={opt}>{opt}</option>)}
        </select>
      );
    }
    if (type === 'datum' || type === 'termin') {
      const dateOptions = ['Heute', 'Morgen', 'Diese Woche', 'Freie Auswahl'];
      const isRange = filterValues[idx] && filterValues[idx].includes(' - ');
      let dropdownValue = filterValues[idx];
      if (isRange) dropdownValue = filterValues[idx];
      else if (filterValues[idx] === 'Freie Auswahl') dropdownValue = 'Freie Auswahl';
      else dropdownValue = filterValues[idx];
      return (
        <div style={{width: 150, position: 'relative'}}>
          <select
            className="input no-border"
            value={isRange ? '' : filterValues[idx]}
            onChange={e => {
              if (e.target.value === '') {
                handleValueChange(idx, '');
                handleValueChange(idx + '_von', '');
                handleValueChange(idx + '_bis', '');
              } else if (e.target.value === 'Freie Auswahl') {
                handleValueChange(idx, 'Freie Auswahl');
              } else {
                handleValueChange(idx, e.target.value);
              }
            }}
            style={{width: '100%'}}
          >
            <option value=""></option>
            {dateOptions.map(opt => (
              <option key={opt} value={opt}>{opt}</option>
            ))}
          </select>
          {isRange && (
            <div style={{
              position: 'absolute',
              left: 0,
              top: 0,
              width: '100%',
              height: '100%',
              display: 'flex',
              alignItems: 'center',
              pointerEvents: 'none',
              background: 'transparent',
              fontSize: '0.75em',
              color: '#222',
              paddingLeft: 8
            }}>
              {filterValues[idx]}
            </div>
          )}
          {(filterValues[idx] === 'Freie Auswahl' && !isRange) && (
            <DateRangePickerBox idx={idx} filterValues={filterValues} handleValueChange={handleValueChange} />
          )}
        </div>
      );
    }
    if (type === 'filiale') {
      return (
        <select className="input no-border" value={filterValues[idx]} onChange={e => handleValueChange(idx, e.target.value)} style={{width: '150px'}}>
          <option value=""></option>
          {filialeOptions.map(f => <option key={f}>{f}</option>)}
        </select>
      );
    }
    return null;
  }

  // Export-Funktion mit Template
  const handleExport = async () => {
    try {
      // Template laden
      const response = await fetch('/templates/Export- Druckvorlage.xlsx');
      if (!response.ok) {
        throw new Error('Template nicht gefunden');
      }
      const templateBuffer = await response.arrayBuffer();
      
      // Daten für Export vorbereiten
      const exportData = [];
      
      eintraege.forEach(eintrag => {
        const formData = eintrag.formData;
        
        // Bewerbung-Eintrag (nur wenn Termin vorhanden UND erschienen noch leer ist)
        if (formData.datumTermin && formData.uhrzeitTermin && !formData.erschienen) {
          exportData.push({
            Art: 'Bewerbung',
            Bewerber: `${formData.vorname || ''} ${formData.nachname || ''}`.trim(),
            Uhrzeit: formatTime(formData.uhrzeitTermin),
            Datum: formatDate(formData.datumTermin), // Für Anzeige
            OriginalDate: formData.datumTermin // Für Export-Formatierung
          });
        }
        
        // Informationstag-Eintrag (wenn Infotag-Daten vorhanden)
        if (formData.infotag && formData.uhrzeit) {
          exportData.push({
            Art: 'Informationstag', 
            Bewerber: `${formData.vorname || ''} ${formData.nachname || ''}`.trim(),
            Uhrzeit: formatTime(formData.uhrzeit),
            Datum: formatDate(formData.infotag), // Für Anzeige
            OriginalDate: formData.infotag // Für Export-Formatierung
          });
        }
      });
      
      // Nach Datum sortieren
      exportData.sort((a, b) => {
        const dateA = new Date(a.OriginalDate);
        const dateB = new Date(b.OriginalDate);
        return dateA - dateB;
      });
      
      // Template mit Daten füllen
      await fillTemplateWithData(templateBuffer, exportData);
      
    } catch (error) {
      console.error('Fehler beim Export:', error);
      alert('Template nicht gefunden. Stelle sicher, dass die Datei "Export- Druckvorlage.xlsx" im Ordner /public/templates/ liegt.');
    }
  };

  // Template mit Daten füllen
  const fillTemplateWithData = async (templateBuffer, data) => {
    try {
      // Workbook aus Template laden
      const workbook = new ExcelJS.Workbook();
      await workbook.xlsx.load(templateBuffer);
      
      // Erstes Worksheet verwenden
      const worksheet = workbook.getWorksheet(1);
      
      // Aktuelles Datum in Zelle A3 eintragen (neues Format)
      const heute = new Date();
      const wochentag = ['Sonntag', 'Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag', 'Samstag'][heute.getDay()];
      const datumStr = `${wochentag}, ${heute.getDate().toString().padStart(2, '0')}.${(heute.getMonth() + 1).toString().padStart(2, '0')}.${heute.getFullYear()}`;
      worksheet.getCell('A3').value = datumStr;
      
      // Daten in die Zeilen 6-37 eintragen (neue Reihenfolge: Datum, Uhrzeit, Bewerber, Art)
      data.forEach((row, index) => {
        if (index < 32) { // Maximal 32 Zeilen (6-37)
          const rowNum = 6 + index;
          
          // B6-B37: Datum
          worksheet.getCell(`B${rowNum}`).value = formatDateWithWeekday(row.OriginalDate);
          
          // C6-C37: Uhrzeit
          worksheet.getCell(`C${rowNum}`).value = row.Uhrzeit;
          
          // D6-D37: Bewerber Name
          worksheet.getCell(`D${rowNum}`).value = row.Bewerber;
          
          // E6-E37: Art
          worksheet.getCell(`E${rowNum}`).value = row.Art;
        }
      });
      
      // Workbook als Buffer exportieren
      const buffer = await workbook.xlsx.writeBuffer();
      
      // Download auslösen
      const blob = new Blob([buffer], { 
        type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' 
      });
      const link = document.createElement('a');
      const url = URL.createObjectURL(blob);
      link.setAttribute('href', url);
      link.setAttribute('download', `Termine-Export-${heute.getDate().toString().padStart(2, '0')}-${(heute.getMonth() + 1).toString().padStart(2, '0')}-${heute.getFullYear()}.xlsx`);
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      
    } catch (error) {
      console.error('Fehler beim Bearbeiten der Excel-Datei:', error);
      throw error;
    }
  };

  // Neue Hilfsfunktion für Datum mit Wochentag
  const formatDateWithWeekday = (dateStr) => {
    if (!dateStr) return '';
    
    // Erstelle Date-Objekt aus dem ursprünglichen Format (JJJJ-MM-TT)
    const date = new Date(dateStr);
    
    const tag = date.getDate().toString().padStart(2, '0');
    const monat = (date.getMonth() + 1).toString().padStart(2, '0');
    const jahr = date.getFullYear();
    
    return `${tag}.${monat}.${jahr}`;
  };

  // Hilfsfunktionen
  const formatDate = (dateStr) => {
    if (!dateStr) return '';
    const [year, month, day] = dateStr.split('-');
    return `${day}.${month}.${year}`;
  };

  const formatTime = (timeStr) => {
    if (!timeStr) return '';
    return timeStr + ' Uhr';
  };

  const parseDate = (dateStr) => {
    if (!dateStr) return new Date(0);
    const [day, month, year] = dateStr.split('.');
    return new Date(year, month - 1, day);
  };

  // Entferne das React-Popup komplett und erstelle es per DOM
  const PrintPopup = ({ isOpen, onClose, data }) => {
    return null; // React-Popup deaktiviert
  };

  // Debugging für showPrintPopup State-Änderungen
  useEffect(() => {
    if (showPrintPopup) {
      console.log('🔔 PrintPopup wurde geöffnet mit', printData.length, 'Terminen');
      
      // ECHTES POPUP PER DOM-MANIPULATION
      setTimeout(() => {
        createDOMPopup();
      }, 100);
      
    } else {
      console.log('🔕 PrintPopup wurde geschlossen');
      // Entferne DOM-Popup falls vorhanden
      const existingPopup = document.getElementById('print-popup-dom');
      if (existingPopup) {
        document.body.removeChild(existingPopup);
      }
    }
  }, [showPrintPopup, printData.length]);

  // Erstelle funktionierendes DOM-Popup
  const createDOMPopup = () => {
    // Entferne existierendes Popup
    const existingPopup = document.getElementById('print-popup-dom');
    if (existingPopup) {
      document.body.removeChild(existingPopup);
    }

    // Erstelle Overlay
    const overlay = document.createElement('div');
    overlay.id = 'print-popup-dom';
    overlay.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100vw;
      height: 100vh;
      background-color: rgba(0,0,0,0.5);
      z-index: 999999;
      display: flex;
      align-items: center;
      justify-content: center;
    `;

    // Erstelle Modal
    const modal = document.createElement('div');
    modal.style.cssText = `
      background-color: white;
      padding: 30px;
      border-radius: 12px;
      box-shadow: 0 8px 32px rgba(0,0,0,0.3);
      width: 500px;
      text-align: center;
    `;

    // Erstelle Inhalt
    modal.innerHTML = `
      <h2 style="margin-bottom: 20px; color: #333;">📄 Druckvorschau</h2>
      <p style="margin-bottom: 15px; color: #666;">
        Es wurden <strong>${printData.length} Termine</strong> für den Druck vorbereitet.
      </p>
      <p style="margin-bottom: 25px; color: #666; font-size: 14px;">
        Die Druckvorschau wird geöffnet.<br/>
        Verwenden Sie den Druckdialog Ihres Browsers.
      </p>
      ${printData.length > 0 ? `
        <div style="background: #f8f9fa; padding: 15px; border-radius: 8px; margin-bottom: 20px; text-align: left; max-height: 200px; overflow: auto;">
          <strong style="font-size: 14px; color: #333;">Termine-Übersicht:</strong>
          <ul style="margin: 10px 0; padding: 0 0 0 20px; font-size: 13px;">
            ${printData.slice(0, 5).map(item => 
              `<li style="margin-bottom: 5px; color: #555;">
                <strong>${item.Art}</strong> - ${item.Bewerber} (${formatDate(item.OriginalDate)}, ${item.Uhrzeit})
              </li>`
            ).join('')}
            ${printData.length > 5 ? 
              `<li style="color: #888; font-style: italic;">... und ${printData.length - 5} weitere Termine</li>` 
              : ''
            }
          </ul>
        </div>
      ` : ''}
      <div style="display: flex; justify-content: center; gap: 15px;">
        <button id="popup-cancel-btn" style="min-width: 120px; padding: 12px 24px; background-color: #6c757d; color: white; border: none; border-radius: 6px; cursor: pointer; font-size: 14px; font-weight: bold;">
          Abbrechen
        </button>
        <button id="popup-print-btn" style="min-width: 120px; padding: 12px 24px; background-color: #007bff; color: white; border: none; border-radius: 6px; cursor: pointer; font-size: 14px; font-weight: bold;">
          🖨️ Drucken
        </button>
      </div>
    `;

    // Event-Listener hinzufügen
    overlay.onclick = (e) => {
      if (e.target === overlay) {
        setShowPrintPopup(false);
      }
    };

    modal.onclick = (e) => {
      e.stopPropagation();
    };

    // Button-Event-Listener nach dem Hinzufügen zum DOM
    overlay.appendChild(modal);
    document.body.appendChild(overlay);

    // Jetzt Event-Listener für Buttons hinzufügen
    document.getElementById('popup-cancel-btn').onclick = () => {
      setShowPrintPopup(false);
    };

    document.getElementById('popup-print-btn').onclick = async () => {
      try {
        await executeActualPrint();
        setShowPrintPopup(false);
      } catch (error) {
        console.error('Fehler beim Drucken:', error);
        alert('Fehler beim Drucken: ' + error.message);
      }
    };

    console.log('✅ DOM-Popup erstellt und Event-Listener hinzugefügt');
  };

  // Tatsächlichen Druck ausführen - HTML-VERSION
  const executeActualPrint = async () => {
    try {
      // Logo als Base64 konvertieren für den Druck
      const logoBase64 = await convertImageToBase64(feibraLogo);
      
      // Aktuelles Datum für Header
      const heute = new Date();
      const wochentag = ['Sonntag', 'Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag', 'Samstag'][heute.getDay()];
      const datumStr = `${wochentag}, ${heute.getDate().toString().padStart(2, '0')}.${(heute.getMonth() + 1).toString().padStart(2, '0')}.${heute.getFullYear()}`;
      
      // HTML-Inhalt erstellen der exakt dem Excel-Template entspricht
      let htmlContent = `
        <!DOCTYPE html>
        <html>
        <head>
          <title>Termine - Bewerber</title>
          <style>
            @page {
              size: A4 portrait;
              margin: 20mm 15mm 15mm 15mm;
            }
            
            * {
              box-sizing: border-box;
            }
            
            body { 
              font-family: Calibri, Arial, sans-serif; 
              margin: 0; 
              padding: 20px;
              font-size: 11pt;
              line-height: 1.2;
              width: 100%;
              max-width: 190mm;
            }
            
            .header {
              margin-bottom: 25px;
              position: relative;
            }
            
            .header-logo {
              position: absolute;
              top: 0;
              right: 0;
              width: 120px;
              height: auto;
            }
            
            .title {
              font-size: 24pt;
              font-weight: bold;
              margin-bottom: 12px;
              color: #000;
              margin-right: 130px;
            }
            
            .date {
              font-size: 12pt;
              margin-bottom: 15px;
              color: #000;
            }
            
            .date-line {
              width: 100%;
              height: 1px;
              background-color: #000;
              margin-bottom: 25px;
            }
            
            .excel-table { 
              width: 100%; 
              max-width: 100%;
              border-collapse: collapse; 
              table-layout: fixed;
              font-size: 11pt;
              margin: 0;
            }
            
            .excel-table td { 
              border: 2px solid #000; 
              padding: 6px 8px; 
              vertical-align: top;
              height: 22px;
              overflow: hidden;
              word-wrap: break-word;
            }
            
            .header-cell {
              background-color: #f0f0f0;
              font-weight: bold;
              text-align: center;
              font-size: 11pt;
            }
            
            .col-datum { width: 20%; text-align: center; }
            .col-uhrzeit { width: 15%; text-align: center; }
            .col-bewerber { width: 50%; text-align: left; }
            .col-art { width: 15%; text-align: center; }
            
            @media print {
              @page {
                size: A4 portrait;
                margin: 20mm 15mm 15mm 15mm;
              }
              
              body { 
                margin: 0 !important; 
                padding: 0 !important;
                width: 100% !important;
                max-width: none !important;
              }
              
              .container {
                padding: 15mm !important;
                width: 100% !important;
                box-sizing: border-box !important;
              }
              
              .excel-table { 
                font-size: 10pt !important;
                width: 100% !important;
              }
              
              .excel-table td { 
                height: 20px !important; 
                padding: 4px 6px !important;
                font-size: 9pt !important;
              }
              
              .title {
                font-size: 14pt !important;
              }
              
              .date {
                font-size: 11pt !important;
              }
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <img src="${logoBase64}" alt="Feibra Logo" class="header-logo" />
              <div class="title">Termine - Bewerber</div>
              <div class="date">${datumStr}</div>
              <div class="date-line"></div>
            </div>
            
            <table class="excel-table">
              <tr>
                <td class="header-cell col-datum">Datum</td>
                <td class="header-cell col-uhrzeit">Uhrzeit</td>
                <td class="header-cell col-bewerber">Bewerber</td>
                <td class="header-cell col-art">Art</td>
              </tr>`;

      // Datenzeilen hinzufügen (maximal 32 Zeilen wie im Template)
      for (let i = 0; i < 32; i++) {
        const row = printData[i];
        if (row) {
          htmlContent += `
            <tr>
              <td class="col-datum">${formatDate(row.OriginalDate)}</td>
              <td class="col-uhrzeit">${row.Uhrzeit}</td>
              <td class="col-bewerber">${row.Bewerber}</td>
              <td class="col-art">${row.Art}</td>
            </tr>`;
        } else {
          // Leere Zeilen für einheitliches Layout
          htmlContent += `
            <tr>
              <td class="col-datum">&nbsp;</td>
              <td class="col-uhrzeit">&nbsp;</td>
              <td class="col-bewerber">&nbsp;</td>
              <td class="col-art">&nbsp;</td>
            </tr>`;
        }
      }

      htmlContent += `
            </table>
          </div>
        </body>
        </html>`;
      
      // Druckfenster öffnen
      const printWindow = window.open('', '_blank', 'width=800,height=600');
      
      if (!printWindow) {
        alert('Popup wurde blockiert. Bitte erlauben Sie Popups für diese Seite.');
        return;
      }
      
      printWindow.document.open();
      printWindow.document.write(htmlContent);
      printWindow.document.close();
      
      // Warten bis Inhalt geladen ist, dann drucken
      setTimeout(() => {
        printWindow.focus();
        printWindow.print();
      }, 500);
      
    } catch (error) {
      console.error('Fehler beim Erstellen der Druckvorschau:', error);
      alert('❌ Fehler beim Erstellen der Druckvorschau.');
    }
  };

  // Hilfsfunktion zum Konvertieren des Bildes zu Base64
  const convertImageToBase64 = (imagePath) => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.crossOrigin = 'anonymous';
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0);
        const dataURL = canvas.toDataURL('image/png');
        resolve(dataURL);
      };
      img.onerror = reject;
      img.src = imagePath;
    });
  };

  // Hilfsfunktion für deutsches Datumsformat im Export
  const formatDateForExport = (dateStr) => {
    if (!dateStr) return '';
    // Wenn es bereits im deutschen Format ist, zurückgeben
    if (dateStr.includes('.')) return dateStr;
    // Wenn im ISO-Format (JJJJ-MM-TT), konvertieren
    const [year, month, day] = dateStr.split('-');
    return `${day}.${month}.${year}`;
  };

  const handleExportExcel = async () => {
    try {
      const workbook = new ExcelJS.Workbook();
      const worksheet = workbook.addWorksheet('Bewerber');

      // Spalten definieren
      worksheet.columns = [
        { header: 'Nr', key: 'nr', width: 10 },
        { header: 'Name', key: 'name', width: 25 },
        { header: 'Vorname', key: 'vorname', width: 20 },
        { header: 'Telefon', key: 'telefon', width: 20 },
        { header: 'E-Mail', key: 'email', width: 25 },
        { header: 'Sprache', key: 'sprache', width: 15 },
        { header: 'Auto', key: 'auto', width: 20 },
        { header: 'EU-Bürger', key: 'euBuerger', width: 15 },
        { header: 'Region', key: 'region', width: 20 },
        { header: 'Erhalten', key: 'erhalten', width: 20 },
        { header: 'Kontaktdatum', key: 'kontaktdatum', width: 15 },
        { header: 'Kontaktaufnahme', key: 'kontaktaufnahme', width: 15 },
        { header: 'Anzahl Termine', key: 'anzahlTermine', width: 15 },
        { header: 'Filiale', key: 'filiale', width: 10 },
        { header: 'Datum Termin', key: 'datumTermin', width: 15 },
        { header: 'Uhrzeit Termin', key: 'uhrzeitTermin', width: 15 },
        { header: 'Kein Termin', key: 'keinTermin', width: 12 },
        { header: 'Grund Termin', key: 'grundTermin', width: 25 },
        { header: 'Status', key: 'step', width: 8 },
        { header: 'Erschienen', key: 'erschienen', width: 12 },
        { header: 'Informationstag', key: 'infotag', width: 15 },
        { header: 'Uhrzeit Infotag', key: 'uhrzeit', width: 15 },
        { header: 'Einschuler', key: 'einschuler', width: 25 },
        { header: 'Auftrag übernommen', key: 'auftrag', width: 18 },
        { header: 'Grund', key: 'grund', width: 25 },
        { header: 'Anmerkung', key: 'anmerkung', width: 30 },
        { header: 'Verteilernr', key: 'verteilernr', width: 15 }
      ];

      // Header-Stil
      worksheet.getRow(1).font = { bold: true };
      // worksheet.getRow(1).fill = {
      //   type: 'pattern',
      //   pattern: 'solid',
      //   fgColor: { argb: '00FFFFFF' }
      // };

      // Daten hinzufügen - ERWEITERT um alle Felder
      eintraege.forEach(eintrag => {
        const formData = eintrag.formData || {};
        worksheet.addRow({
          nr: eintrag.id,
          name: formData.nachname || '',
          vorname: formData.vorname || '',
          telefon: formData.telefon || '',
          email: formData.email || '',
          sprache: formData.sprache || '',
          auto: formData.auto || '',
          euBuerger: formData.euBuerger || '',
          region: formData.region || '',
          erhalten: formData.erhalten || '',
          kontaktdatum: formatDateForExport(formData.kontaktdatum) || '',
          kontaktaufnahme: formData.kontaktaufnahme || '',
          anzahlTermine: formData.anzahlTermine || 0,
          filiale: formData.filiale || '',
          datumTermin: formatDateForExport(formData.datumTermin) || '',
          uhrzeitTermin: formData.uhrzeitTermin || '',
          keinTermin: formData.keinTermin ? 'Ja' : 'Nein',
          grundTermin: formData.grundTermin || '',
          step: eintrag.step || 1,
          erschienen: formData.erschienen || '',
          infotag: formatDateForExport(formData.infotag) || '',
          uhrzeit: formData.uhrzeit || '',
          einschuler: formData.einschuler || '',
          auftrag: formData.auftrag || '',
          grund: formData.grund || '',
          anmerkung: formData.anmerkung || '',
          verteilernr: formData.verteilernr || ''
        });
      });

      // Autofilter hinzufügen
      worksheet.autoFilter = 'A1:AA1';

      // Excel-Datei generieren und downloaden
      const buffer = await workbook.xlsx.writeBuffer();
      const blob = new Blob([buffer], { 
        type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' 
      });
      
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `Paperboy_Export_${new Date().toISOString().split('T')[0]}.xlsx`;
      link.click();
      window.URL.revokeObjectURL(url);
      
    } catch (error) {
      console.error('Fehler beim Excel-Export:', error);
      alert('Fehler beim Exportieren der Excel-Datei');
    }
  };

  // Drucken-Funktion - zeigt Popup zur Bestätigung
  const handlePrint = async () => {
    try {
      // Daten für Druck vorbereiten
      const preparedData = [];
      
      eintraege.forEach(eintrag => {
        const formData = eintrag.formData;
        
        // Bewerbung-Eintrag (nur wenn Termin vorhanden UND erschienen noch leer ist)
        if (formData.datumTermin && formData.uhrzeitTermin && !formData.erschienen) {
          preparedData.push({
            Art: 'Bewerbung',
            Bewerber: `${formData.vorname || ''} ${formData.nachname || ''}`.trim(),
            Uhrzeit: formatTime(formData.uhrzeitTermin),
            OriginalDate: formData.datumTermin
          });
        }
        
        // Informationstag-Eintrag (wenn Infotag-Daten vorhanden)
        if (formData.infotag && formData.uhrzeit) {
          preparedData.push({
            Art: 'Informationstag', 
            Bewerber: `${formData.vorname || ''} ${formData.nachname || ''}`.trim(),
            Uhrzeit: formatTime(formData.uhrzeit),
            OriginalDate: formData.infotag
          });
        }
      });
      
      // Nach Datum sortieren
      preparedData.sort((a, b) => {
        const dateA = new Date(a.OriginalDate);
        const dateB = new Date(b.OriginalDate);
        return dateA - dateB;
      });
      
      
      // Daten speichern und Popup anzeigen
      setPrintData(preparedData);
      setShowPrintPopup(true);
      
    } catch (error) {
      console.error('Fehler beim Vorbereiten des Drucks:', error);
      alert('Fehler beim Vorbereiten der Druckdaten.');
    }
  };

  return (
    <header className="header-bar">
      <div className="header-bar-top">
        <div className="header-bar-logo-title">
          <img 
            src={logo} // Verwende das importierte Logo
            alt="Logo" 
            className="header-bar-logo"
            style={{
              width: '36px',
              height: '48px',
              objectFit: 'contain',
              marginRight: '12px',
              marginLeft: '20px'
            }}
          />
          <div>
            <div className="header-bar-title" style={{ marginLeft: '8px', fontSize: '26px', marginTop: '-5px' }}>Qualitäts Management System</div>
            <div className="header-bar-sub" style={{ marginLeft: '8px', marginTop: '-8px' }}>PAPERBOY</div>
          </div>
        </div>
        <div className="header-bar-actions">
          <button onClick={onNeu}>NEU</button>
          <button>IMPORTIEREN</button>
          <button onClick={handleExportExcel}>EXPORTIEREN</button>
          <button onClick={handlePrint}>DRUCKEN</button>
          <button>SUCHEN</button>
        </div>
      </div>
      <div className="header-bar-filter">
        <div className="header-bar-filter-info">
          <div className="header-bar-filter-info-title">BEWERBUNGEN</div>
          <div className="header-bar-filter-info-count">Ergebnis: {count}</div>
        </div>
        {[0,1,2,3].map(idx => (
          <div className="filter-box" key={idx}>
            <select
              className="filter-dropdown no-border"
              value={filterTypes[idx]}
              onChange={e => handleTypeChange(idx, e.target.value)}
              style={{width: '150px'}}
            >
              <option value=""></option>
              {getAvailableTypes(idx).map(opt => (
                <option key={opt.value} value={opt.value} disabled={opt.disabled}>{opt.label}</option>
              ))}
            </select>
            {renderValueDropdown(filterTypes[idx], idx)}
          </div>
        ))}
      </div>
      
      {/* Druck-Popup */}
      <PrintPopup 
        isOpen={showPrintPopup} 
        onClose={() => setShowPrintPopup(false)}
        data={printData}
      />
    </header>
  );
};

const filterOptions = [
  { label: 'Status', value: 'status' },
  { label: 'Kontaktdatum', value: 'datum' },
  { label: 'Termin/Infotag', value: 'termin' },
  { label: 'Filiale', value: 'filiale' },
];
const statusOptions = ['Offen', 'Status 1', 'Status 2', 'Status 3', 'Status 4'];
const filialeOptions = ['Fil01','Fil02','Fil03','Fil05','Fil06','Fil07','Fil08','Fil09','Fil10','Fil13','Fil15'];

export default HeaderBar;

