import React from 'react';

function Header() {
  return (
    <header className="header">
      <div className="logo">Feibra</div>
      <div className="title">Qualitäts Management System</div>
      <div className="actions">
        <button>+ NEU</button>
        <button>IMPORTIEREN</button>
        <button>EXPORTIEREN</button>
        <button>DRUCKEN</button>
        <button>SCHEN</button>
      </div>
    </header>
  );
}

export default Header;