import type { WeatherData } from '../../services/weather';
import { getWeatherAlerts, type WeatherAlert } from '../../utils/weatherAlerts';
import { useTranslation } from 'react-i18next';
import styles from './WeatherAlerts.module.css';

interface WeatherAlertsProps {
  weather: WeatherData;
}

export function WeatherAlerts({ weather }: WeatherAlertsProps) {
  const { t } = useTranslation();
  const alerts = getWeatherAlerts(weather);

  if (alerts.length === 0) {
    return null;
  }

  const getAlertIcon = (type: WeatherAlert['type']): string => {
    switch (type) {
      case 'extreme-heat':
        return '🔥';
      case 'extreme-cold':
        return '❄️';
      case 'high-wind':
        return '💨';
      case 'heavy-rain':
        return '🌧️';
      case 'storm':
        return '⛈️';
      default:
        return '⚠️';
    }
  };

  const getSeverityClass = (severity: WeatherAlert['severity']): string => {
    switch (severity) {
      case 'high':
        return styles.high;
      case 'moderate':
        return styles.moderate;
      case 'low':
        return styles.low;
      default:
        return styles.low;
    }
  };

  return (
    <div className={styles.container}>
      <h3 className={styles.title}>{t('weatherAlerts.title')}</h3>
      <div className={styles.alertsList}>
        {alerts.map((alert, index) => (
          <div key={index} className={`${styles.alert} ${getSeverityClass(alert.severity)}`} role="alert">
            <span className={styles.icon} aria-hidden="true">{getAlertIcon(alert.type)}</span>
            <span className={styles.message}>{alert.message}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
