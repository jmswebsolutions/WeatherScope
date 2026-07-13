import { SearchBar } from './components/SearchBar/SearchBar';
import { WeatherCard } from './components/WeatherCard/WeatherCard';
import { ForecastCard } from './components/ForecastCard/ForecastCard';
import { HourlyForecast } from './components/HourlyForecast/HourlyForecast';
import { WeatherMap } from './components/WeatherMap/WeatherMap';
import { Favorites } from './components/Favorites/Favorites';
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
      <div className="header">
        <h1 className="title">{t('app.title')}</h1>
        <div className="headerControls">
          <LanguageSelector />
          <button className="themeToggle" onClick={toggleTheme} title={t('theme.toggle')}>
            {isDark ? '☀️' : '🌙'}
          </button>
        </div>
      </div>
      <SearchBar onSearch={search} onLocationSearch={searchByLocation} loading={loading} />
      <Favorites />
      {weatherData && <WeatherCard data={weatherData} />}
      {weatherData && <HourlyForecast data={weatherData} />}
      {weatherData && <ForecastCard data={weatherData} />}
      {weatherData && (
        <WeatherMap
          lat={weatherData.city.latitude}
          lon={weatherData.city.longitude}
          cityName={weatherData.city.name}
        />
      )}
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
