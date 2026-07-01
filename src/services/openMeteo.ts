import type { GeocodingResult, WeatherData, CombinedWeatherData } from '../types/weather';

const GEOCODING_API = 'https://geocoding-api.open-meteo.com/v1/search';
const FORECAST_API = 'https://api.open-meteo.com/v1/forecast';

export async function searchCity(cityName: string): Promise<GeocodingResult | null> {
  try {
    const response = await fetch(
      `${GEOCODING_API}?name=${encodeURIComponent(cityName)}&count=1&language=pt`
    );

    if (!response.ok) {
      return null;
    }

    const data = await response.json();

    if (!data.results || data.results.length === 0) {
      return null;
    }

    const result = data.results[0];

    return {
      name: result.name,
      latitude: result.latitude,
      longitude: result.longitude,
      country_code: result.country_code,
      timezone: result.timezone,
    };
  } catch (error) {
    console.error('Error searching city:', error);
    return null;
  }
}

export async function getWeather(
  lat: number,
  lon: number,
  tz: string
): Promise<WeatherData | null> {
  try {
    const response = await fetch(
      `${FORECAST_API}?latitude=${lat}&longitude=${lon}&timezone=${encodeURIComponent(tz)}&current=temperature_2m,relative_humidity_2m,apparent_temperature,precipitation,wind_speed_10m,wind_direction_10m,is_day,weather_code`
    );

    if (!response.ok) {
      return null;
    }

    const data = await response.json();

    return {
      current: data.current,
      current_units: data.current_units,
    };
  } catch (error) {
    console.error('Error getting weather:', error);
    return null;
  }
}

export async function searchWeather(cityName: string): Promise<CombinedWeatherData | null> {
  const city = await searchCity(cityName);
  if (!city) return null;

  const weather = await getWeather(city.latitude, city.longitude, city.timezone);
  if (!weather) return null;

  return { city, weather };
}
