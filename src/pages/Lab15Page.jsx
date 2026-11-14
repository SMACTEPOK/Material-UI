import React from 'react';
import { useTranslation } from 'react-i18next';
import { WeatherChart } from '../components/WeatherChart';
import { PieChartAdapter } from '../components/PieChartAdapter';
import { EventScheduler } from '../components/EventScheduler';
import { MuiBrutalTheme } from '../components/MuiBrutalTheme';
import { AdvancedSearch } from '../components/AdvancedSearch';
import { LanguageSwitcher } from '../components/LanguageSwitcher';
import './Lab15Page.css';

export default function Lab15Page() {
  const { t } = useTranslation();

  const pieData = [30, 20, 25, 15, 10];
  const pieLabels = ['Категорія A', 'Категорія B', 'Категорія C', 'Категорія D', 'Категорія E'];

  return (
    <div className="lab-page">
      <header className="lab-header">
        <h1 className="lab-title">{t('title')}</h1>
        <p className="lab-subtitle">{t('subtitle')}</p>
      </header>

      <LanguageSwitcher />
      <WeatherChart />
      <PieChartAdapter data={pieData} labels={pieLabels} />
      <EventScheduler />
      <MuiBrutalTheme />
      <AdvancedSearch />
    </div>
  );
}
