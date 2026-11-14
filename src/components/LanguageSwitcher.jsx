import React from 'react';
import { useTranslation } from 'react-i18next';

export function LanguageSwitcher() {
  const { i18n } = useTranslation();

  return (
    <div className="lab-card" style={{ borderColor: 'var(--color-success)' }}>
      <h2 className="lab-card__title" style={{ color: 'var(--color-success)' }}>ІНДИВІДУАЛЬНЕ / i18n Мови</h2>
      <p style={{ fontSize: '13px', marginBottom: '16px' }}>
        Поточна мова: <b>{i18n.language.toUpperCase()}</b>
      </p>
      <div style={{ display: 'flex', gap: '10px' }}>
        <button className="btn" onClick={() => i18n.changeLanguage('uk')}>Українська</button>
        <button className="btn" onClick={() => i18n.changeLanguage('en')}>English</button>
        <button className="btn" onClick={() => i18n.changeLanguage('de')}>Deutsch</button>
      </div>
    </div>
  );
}
