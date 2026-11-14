import React, { useState, useMemo } from 'react';
import { ComposedChart, Line, Area, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { format, subDays } from 'date-fns';
import { uk } from 'date-fns/locale';

export function WeatherChart() {
  const [isDay, setIsDay] = useState(true);

  const data = useMemo(() => {
    return Array.from({ length: 7 }).map((_, i) => {
      const date = subDays(new Date(), 6 - i);
      return {
        date: format(date, 'dd MMM', { locale: uk }),
        temp: Math.floor(Math.random() * 15) + (isDay ? 15 : 5),
        humidity: Math.floor(Math.random() * 40) + 40,
        precipitation: isDay ? Math.floor(Math.random() * 20) : Math.floor(Math.random() * 50)
      };
    });
  }, [isDay]);

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div style={{ background: 'var(--color-surface)', border: '2px solid var(--color-border)', padding: '10px', fontFamily: 'var(--font-mono)', fontSize: '12px' }}>
          <p style={{ margin: '0 0 5px', color: 'var(--color-white)' }}>{label}</p>
          <p style={{ margin: 0, color: 'var(--color-success)' }}>Темп: {payload[0].value}°C</p>
          <p style={{ margin: 0, color: 'var(--color-warning)' }}>Вологість: {payload[1].value}%</p>
          <p style={{ margin: 0, color: 'var(--color-danger)' }}>Опади: {payload[2].value} мм</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="lab-card">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h2 className="lab-card__title" style={{ margin: 0, border: 'none', padding: 0 }}>01 / Погода (Recharts)</h2>
        <button className="btn" onClick={() => setIsDay(!isDay)}>
          Режим: {isDay ? 'День' : 'Ніч'}
        </button>
      </div>
      
      <div style={{ height: '300px', width: '100%' }}>
        <ResponsiveContainer>
          <ComposedChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
            <XAxis dataKey="date" stroke="var(--color-muted)" tick={{ fill: 'var(--color-muted)', fontFamily: 'var(--font-mono)' }} />
            <YAxis stroke="var(--color-muted)" tick={{ fill: 'var(--color-muted)', fontFamily: 'var(--font-mono)' }} />
            <Tooltip content={<CustomTooltip />} />
            <Legend wrapperStyle={{ fontFamily: 'var(--font-mono)' }} />
            <Area type="monotone" dataKey="temp" fill="var(--color-success)" stroke="var(--color-success)" fillOpacity={0.3} name="Температура" />
            <Line type="monotone" dataKey="humidity" stroke="var(--color-warning)" strokeWidth={2} name="Вологість" />
            <Bar dataKey="precipitation" fill="var(--color-danger)" name="Опади" barSize={20} />
          </ComposedChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
