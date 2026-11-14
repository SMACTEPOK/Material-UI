import React, { useState, useMemo } from 'react';
import { format, isBefore, parseISO, formatDistanceToNow, isPast, isFuture, isToday } from 'date-fns';
import { uk } from 'date-fns/locale';

export function EventScheduler() {
  const [events, setEvents] = useState([]);
  const [form, setForm] = useState({ title: '', start: '', end: '', desc: '' });
  const [error, setError] = useState('');

  const handleAdd = (e) => {
    e.preventDefault();
    setError('');

    if (!form.title || !form.start || !form.end) return;

    const start = parseISO(form.start);
    const end = parseISO(form.end);

    if (isBefore(end, start)) {
      setError('Дата кінця не може бути раніше дати початку');
      return;
    }

    setEvents([...events, { ...form, id: Date.now(), startObj: start, endObj: end }].sort((a, b) => a.startObj - b.startObj));
    setForm({ title: '', start: '', end: '', desc: '' });
  };

  const getStatus = (start) => {
    if (isPast(start) && !isToday(start)) return { text: 'Минула', color: 'var(--color-muted)' };
    if (isToday(start)) return { text: 'Сьогодні', color: 'var(--color-warning)' };
    if (isFuture(start)) return { text: 'Майбутня', color: 'var(--color-success)' };
    return { text: '', color: '' };
  };

  return (
    <div className="lab-card">
      <h2 className="lab-card__title">03 / Планувальник подій (date-fns)</h2>
      
      <form onSubmit={handleAdd} style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginBottom: '20px' }}>
        <input className="lab-input" placeholder="Назва" value={form.title} onChange={e => setForm({...form, title: e.target.value})} />
        <input type="datetime-local" className="lab-input" value={form.start} onChange={e => setForm({...form, start: e.target.value})} />
        <input type="datetime-local" className="lab-input" value={form.end} onChange={e => setForm({...form, end: e.target.value})} />
        <button type="submit" className="btn">Додати</button>
      </form>
      {error && <p style={{ color: 'var(--color-danger)', fontFamily: 'var(--font-mono)', fontSize: '12px' }}>{error}</p>}

      <div className="list">
        {events.map(ev => {
          const status = getStatus(ev.startObj);
          return (
            <div key={ev.id} className="list-item" style={{ flexDirection: 'column', alignItems: 'flex-start', gap: '8px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                <strong style={{ color: 'var(--color-white)' }}>{ev.title}</strong>
                <span style={{ color: status.color, fontSize: '11px' }}>{status.text}</span>
              </div>
              <div style={{ fontSize: '12px', color: 'var(--color-muted)' }}>
                {format(ev.startObj, 'dd MMM yyyy, HH:mm', { locale: uk })} — {format(ev.endObj, 'HH:mm')}
              </div>
              <div style={{ fontSize: '11px', color: 'var(--color-success)', fontFamily: 'var(--font-mono)' }}>
                ({formatDistanceToNow(ev.startObj, { addSuffix: true, locale: uk })})
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
