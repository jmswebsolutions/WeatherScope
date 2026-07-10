import type { CombinedWeatherData } from '../../services/weather';
import { getWeatherDescription } from '../../utils/weatherCode';
import { getWindDirection } from '../../utils/windDirection';
import { useFavorites } from '../../contexts/FavoritesContext';
import styles from './WeatherCard.module.css';

interface WeatherCardProps {
  data: CombinedWeatherData;
}

export function WeatherCard({ data }: WeatherCardProps) {
  const { city, weather } = data;
  const { current, current_units } = weather;
  const { addFavorite, removeFavorite, isFavorite } = useFavorites();

  const weatherDescription = getWeatherDescription(current.weather_code);
  const windDirection = getWindDirection(current.wind_direction_10m);
  const favorite = isFavorite(city);

  const toggleFavorite = () => {
    if (favorite) {
      const id = `${city.name}-${city.latitude}-${city.longitude}`;
      removeFavorite(id);
    } else {
      addFavorite(city);
    }
  };

  return (
    <div className={styles.weatherCard}>
      <div className={styles.header}>
        <div>
          <h2 className={styles.cityName}>{city.name}</h2>
          <p className={styles.country}>{city.country_code}</p>
        </div>
        <button
          className={styles.favoriteButton}
          onClick={toggleFavorite}
          title={favorite ? 'Remove from favorites' : 'Add to favorites'}
          aria-label={favorite ? 'Remove from favorites' : 'Add to favorites'}
        >
          {favorite ? '★' : '☆'}
        </button>
      </div>

      <div className={styles.mainInfo}>
        <div className={styles.temperature}>
          {Math.round(current.temperature_2m)}°{current_units.temperature_2m.replace('°C', '')}
        </div>
        <div className={styles.condition}>{weatherDescription}</div>
      </div>

      <div className={styles.metrics}>
        <div className={styles.metric}>
          <span className={styles.metricLabel}>Feels like</span>
          <span className={styles.metricValue}>
            {Math.round(current.apparent_temperature)}°{current_units.temperature_2m.replace('°C', '')}
          </span>
        </div>

        <div className={styles.metric}>
          <span className={styles.metricLabel}>Humidity</span>
          <span className={styles.metricValue}>
            {current.relative_humidity_2m}{current_units.relative_humidity_2m}
          </span>
        </div>

        <div className={styles.metric}>
          <span className={styles.metricLabel}>Wind</span>
          <span className={styles.metricValue}>
            {current.wind_speed_10m} {current_units.wind_speed_10m} {windDirection}
          </span>
        </div>

        <div className={styles.metric}>
          <span className={styles.metricLabel}>Precipitation</span>
          <span className={styles.metricValue}>
            {current.precipitation} {current_units.precipitation}
          </span>
        </div>
      </div>
    </div>
  );
}
