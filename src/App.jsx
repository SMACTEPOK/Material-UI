import React from 'react';
import './i18n';
import Lab15Page from './pages/Lab15Page';
import './App.css';

function App() {
  return (
    <div className="app">
      <header className="app__header">
        <div className="app__brand">
          <span className="app__brand-mark">✱</span>
          CRAFTMARKET
          <span className="app__brand-tag">LAB 15</span>
        </div>
      </header>
      <main className="app__main">
        <Lab15Page />
      </main>
      <footer className="app__footer">
        <p>© 2026 CRAFTMARKET · Лабораторна робота 15 · Libraries Integration</p>
      </footer>
    </div>
  );
}
export default App;
