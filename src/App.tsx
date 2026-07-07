import { SearchBar } from './components/SearchBar/SearchBar';
import { WeatherCard } from './components/WeatherCard/WeatherCard';
import { ForecastCard } from './components/ForecastCard/ForecastCard';
import { HourlyForecast } from './components/HourlyForecast/HourlyForecast';
import { useWeather } from './hooks/useWeather';
import { useTheme } from './contexts/ThemeContext';
import './App.css';

function App() {
  const { weatherData, loading, search, searchByLocation } = useWeather();
  const { isDark, toggleTheme } = useTheme();

  return (
    <div className="app">
      <div className="header">
        <h1 className="title">WeatherScope</h1>
        <button className="themeToggle" onClick={toggleTheme} title="Toggle dark mode">
          {isDark ? '☀️' : '🌙'}
        </button>
      </div>
      <SearchBar onSearch={search} onLocationSearch={searchByLocation} loading={loading} />
      {weatherData && <WeatherCard data={weatherData} />}
      {weatherData && <HourlyForecast data={weatherData} />}
      {weatherData && <ForecastCard data={weatherData} />}
    </div>
  );
}

export default App;
