import { SearchBar } from './components/SearchBar/SearchBar';
import { WeatherCard } from './components/WeatherCard/WeatherCard';
import { useWeather } from './hooks/useWeather';
import './App.css';

function App() {
  const { weatherData, loading, search } = useWeather();

  return (
    <div className="app">
      <h1 className="title">WeatherScope</h1>
      <SearchBar onSearch={search} loading={loading} />
      {weatherData && <WeatherCard data={weatherData} />}
    </div>
  );
}

export default App;
