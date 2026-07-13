import type { CombinedWeatherData } from '../../services/weather';
import { getWeatherDescription } from '../../utils/weatherCode';
import { useTranslation } from 'react-i18next';
import styles from './HourlyForecast.module.css';

interface HourlyForecastProps {
  data: CombinedWeatherData;
}

export function HourlyForecast({ data }: HourlyForecastProps) {
  const { weather } = data;
  const { t, i18n } = useTranslation();

  if (!weather.hourly || !weather.hourly.time) {
    return null;
  }

  // Get the next 24 hours starting from current hour
  const currentHour = new Date().getHours();
  const startIndex = weather.hourly.time.findIndex((time) => {
    const hour = new Date(time).getHours();
    return hour === currentHour;
  });

  const hourlyData = weather.hourly.time
    .slice(startIndex, startIndex + 24)
    .map((time, index) => ({
      time: new Date(time),
      temperature: weather.hourly!.temperature_2m[startIndex + index],
      weatherCode: weather.hourly!.weather_code[startIndex + index],
    }));

  const formatTime = (date: Date): string => {
    return date.toLocaleTimeString(i18n.language, { hour: 'numeric', hour12: true });
  };

  return (
    <div className={styles.hourlyForecast}>
      <h3 className={styles.title}>{t('hourlyForecast.title')}</h3>
      <div className={styles.hourlyList}>
        {hourlyData.map((hour, index) => (
          <div key={index} className={styles.hourlyItem}>
            <span className={styles.time}>{formatTime(hour.time)}</span>
            <span className={styles.icon}>
              {getWeatherDescription(hour.weatherCode)}
            </span>
            <span className={styles.temperature}>
              {Math.round(hour.temperature)}°
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
