import React, { useEffect, useRef } from 'react';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

export function PieChartAdapter({ data, labels }) {
  const canvasRef = useRef(null);
  const chartRef = useRef(null);

  useEffect(() => {
    if (chartRef.current) chartRef.current.destroy();
    const ctx = canvasRef.current.getContext('2d');

    const colors = labels.map((_, i) => `hsl(${i * (360 / labels.length)}, 70%, 50%)`);

    chartRef.current = new Chart(ctx, {
      type: 'pie',
      data: {
        labels: labels,
        datasets: [{
          data: data,
          backgroundColor: colors,
          borderColor: '#111',
          borderWidth: 2
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        animation: { duration: 1000 },
        plugins: {
          legend: { labels: { color: '#d0d0d0', font: { family: 'Roboto Mono' } } }
        }
      }
    });

    return () => { if (chartRef.current) chartRef.current.destroy(); };
  }, [data, labels]);

  return (
    <div className="lab-card">
      <h2 className="lab-card__title">02 / Кругова діаграма (Chart.js)</h2>
      <div style={{ height: '300px' }}>
        <canvas ref={canvasRef} />
      </div>
    </div>
  );
}
