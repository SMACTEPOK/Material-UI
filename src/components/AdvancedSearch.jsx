import React, { useState, useCallback, useMemo } from 'react';
import { debounce, filter, includes, toLower } from 'lodash';

const BIG_DATA = Array.from({ length: 1000 }, (_, i) => `Елемент каталогу #${i + 1} - тест пошуку`);

export function AdvancedSearch() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);

  const performSearch = useCallback(
    debounce((searchTerm) => {
      if (!searchTerm.trim()) {
        setResults([]);
        setIsSearching(false);
        return;
      }
      const filtered = filter(BIG_DATA, item => includes(toLower(item), toLower(searchTerm)));
      setResults(filtered.slice(0, 10)); // Показуємо перші 10
      setIsSearching(false);
    }, 300),
    []
  );

  const handleChange = (e) => {
    setQuery(e.target.value);
    setIsSearching(true);
    performSearch(e.target.value);
  };

  return (
    <div className="lab-card">
      <h2 className="lab-card__title">05 / Пошук (lodash debounce)</h2>
      <div className="lab-controls">
        <input 
          type="text" 
          className="lab-input" 
          style={{ flex: 1 }} 
          placeholder="Пошук серед 1000 елементів..." 
          value={query} 
          onChange={handleChange} 
        />
      </div>
      
      {isSearching && <p style={{ color: 'var(--color-muted)', fontSize: '12px' }}>Друкуємо... (зачекайте 300мс)</p>}
      
      <div className="list" style={{ marginTop: '16px' }}>
        {results.map((res, i) => (
          <div key={i} className="list-item">{res}</div>
        ))}
        {!isSearching && query && results.length === 0 && (
          <div className="list-item" style={{ color: 'var(--color-danger)' }}>Нічого не знайдено</div>
        )}
      </div>
    </div>
  );
}
