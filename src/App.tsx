import { SearchBar } from './components/SearchBar/SearchBar';
import { WeatherCard } from './components/WeatherCard/WeatherCard';
import { ForecastCard } from './components/ForecastCard/ForecastCard';
import { HourlyForecast } from './components/HourlyForecast/HourlyForecast';
import { WeatherMap } from './components/WeatherMap/WeatherMap';
import { Favorites } from './components/Favorites/Favorites';
import { WeatherAlerts } from './components/WeatherAlerts/WeatherAlerts';
import { LanguageSelector } from './components/LanguageSelector/LanguageSelector';
import { useWeather } from './hooks/useWeather';
import { useTheme } from './contexts/ThemeContext';
import { FavoritesProvider } from './contexts/FavoritesContext';
import { useTranslation } from 'react-i18next';
import './App.css';

function AppContent() {
  const { weatherData, loading, search, searchByLocation } = useWeather();
  const { isDark, toggleTheme } = useTheme();
  const { t } = useTranslation();

  return (
    <div className="app">
      <a href="#main-content" className="skip-link">
        {t('accessibility.skipToContent')}
      </a>
      <header className="header">
        <h1 className="title">{t('app.title')}</h1>
        <div className="headerControls">
          <LanguageSelector />
          <button className="themeToggle" onClick={toggleTheme} title={t('theme.toggle')} aria-label={t('theme.toggle')}>
            <span aria-hidden="true">{isDark ? '☀️' : '🌙'}</span>
          </button>
        </div>
      </header>
      <main id="main-content" className="main-content">
        <SearchBar onSearch={search} onLocationSearch={searchByLocation} loading={loading} />
        <Favorites />
        {weatherData && <WeatherCard data={weatherData} />}
        {weatherData && <WeatherAlerts weather={weatherData.weather} />}
        {weatherData && <HourlyForecast data={weatherData} />}
        {weatherData && <ForecastCard data={weatherData} />}
        {weatherData && (
          <WeatherMap
            lat={weatherData.city.latitude}
            lon={weatherData.city.longitude}
            cityName={weatherData.city.name}
          />
        )}
      </main>
    </div>
  );
}

function App() {
  return (
    <FavoritesProvider>
      <AppContent />
    </FavoritesProvider>
  );
}

export default App;
