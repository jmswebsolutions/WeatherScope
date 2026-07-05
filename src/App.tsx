import { SearchBar } from './components/SearchBar/SearchBar';
import { WeatherCard } from './components/WeatherCard/WeatherCard';
import { ForecastCard } from './components/ForecastCard/ForecastCard';
import { useWeather } from './hooks/useWeather';
import './App.css';

function App() {
  const { weatherData, loading, search, searchByLocation } = useWeather();

  return (
    <div className="app">
      <h1 className="title">WeatherScope</h1>
      <SearchBar onSearch={search} onLocationSearch={searchByLocation} loading={loading} />
      {weatherData && <WeatherCard data={weatherData} />}
      {weatherData && <ForecastCard data={weatherData} />}
    </div>
  );
}

export default App;
