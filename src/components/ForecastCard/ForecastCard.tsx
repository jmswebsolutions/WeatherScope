import type { CombinedWeatherData } from '../../services/weather';
import { getWeatherDescription } from '../../utils/weatherCode';
import styles from './ForecastCard.module.css';

interface ForecastCardProps {
  data: CombinedWeatherData;
}

export function ForecastCard({ data }: ForecastCardProps) {
  const { weather } = data;

  if (!weather.daily || !weather.daily.time) {
    return null;
  }

  // Get the next 7 days (skip today which is index 0)
  const forecastDays = weather.daily.time.slice(1, 8).map((date, index) => ({
    date: new Date(date),
    maxTemp: weather.daily!.temperature_2m_max[index + 1],
    minTemp: weather.daily!.temperature_2m_min[index + 1],
    weatherCode: weather.daily!.weather_code[index + 1],
  }));

  const getDayName = (date: Date): string => {
    return date.toLocaleDateString('en-US', { weekday: 'short' });
  };

  return (
    <div className={styles.forecastCard}>
      <h3 className={styles.title}>7-Day Forecast</h3>
      <div className={styles.forecastList}>
        {forecastDays.map((day, index) => (
          <div key={index} className={styles.forecastItem}>
            <span className={styles.day}>{getDayName(day.date)}</span>
            <span className={styles.description}>
              {getWeatherDescription(day.weatherCode)}
            </span>
            <div className={styles.temperatures}>
              <span className={styles.maxTemp}>
                {Math.round(day.maxTemp)}°
              </span>
              <span className={styles.minTemp}>
                {Math.round(day.minTemp)}°
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
