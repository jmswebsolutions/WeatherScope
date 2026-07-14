import type { WeatherData } from '../services/weather';

export interface WeatherAlert {
  type: 'extreme-heat' | 'extreme-cold' | 'high-wind' | 'heavy-rain' | 'storm';
  severity: 'low' | 'moderate' | 'high';
  message: string;
}

export function getWeatherAlerts(weather: WeatherData): WeatherAlert[] {
  const alerts: WeatherAlert[] = [];
  const { current } = weather;
  const temp = current.temperature_2m;
  const windSpeed = current.wind_speed_10m;
  const precipitation = current.precipitation;
  const weatherCode = current.weather_code;

  // Extreme heat alert (above 35°C)
  if (temp >= 35) {
    alerts.push({
      type: 'extreme-heat',
      severity: 'high',
      message: `Extreme heat warning: Temperature is ${Math.round(temp)}°C. Stay hydrated and avoid prolonged sun exposure.`,
    });
  } else if (temp >= 30) {
    alerts.push({
      type: 'extreme-heat',
      severity: 'moderate',
      message: `High temperature: ${Math.round(temp)}°C. Stay cool and hydrated.`,
    });
  }

  // Extreme cold alert (below 0°C)
  if (temp <= -10) {
    alerts.push({
      type: 'extreme-cold',
      severity: 'high',
      message: `Extreme cold warning: Temperature is ${Math.round(temp)}°C. Dress warmly and limit outdoor exposure.`,
    });
  } else if (temp <= 0) {
    alerts.push({
      type: 'extreme-cold',
      severity: 'moderate',
      message: `Freezing temperatures: ${Math.round(temp)}°C. Dress warmly.`,
    });
  }

  // High wind alert (above 50 km/h)
  if (windSpeed >= 80) {
    alerts.push({
      type: 'high-wind',
      severity: 'high',
      message: `Dangerous wind conditions: ${Math.round(windSpeed)} km/h. Avoid outdoor activities.`,
    });
  } else if (windSpeed >= 50) {
    alerts.push({
      type: 'high-wind',
      severity: 'moderate',
      message: `Strong winds: ${Math.round(windSpeed)} km/h. Exercise caution outdoors.`,
    });
  }

  // Heavy rain alert (above 10mm)
  if (precipitation >= 20) {
    alerts.push({
      type: 'heavy-rain',
      severity: 'high',
      message: `Heavy rainfall: ${precipitation}mm. Flash flood warning in effect.`,
    });
  } else if (precipitation >= 10) {
    alerts.push({
      type: 'heavy-rain',
      severity: 'moderate',
      message: `Heavy rain: ${precipitation}mm. Be aware of potential flooding.`,
    });
  }

  // Storm alert (thunderstorm codes: 95, 96, 99)
  if (weatherCode === 95 || weatherCode === 96 || weatherCode === 99) {
    alerts.push({
      type: 'storm',
      severity: 'high',
      message: 'Thunderstorm warning. Seek shelter immediately.',
    });
  }

  return alerts;
}
