import type { GeocodingResult, WeatherData, CombinedWeatherData } from './weather';

const GEOCODING_API = 'https://geocoding-api.open-meteo.com/v1/search';
const FORECAST_API = 'https://api.open-meteo.com/v1/forecast';

export async function searchCity(cityName: string): Promise<GeocodingResult | null> {
  try {
    const response = await fetch(
      `${GEOCODING_API}?name=${encodeURIComponent(cityName)}&count=1`
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
    return null;
  }
}

export async function getWeather(
  lat: number,
  lon: number
): Promise<WeatherData | null> {
  try {
    const url = `${FORECAST_API}?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,apparent_temperature,precipitation,wind_speed_10m,wind_direction_10m,is_day,weather_code&daily=temperature_2m_max,temperature_2m_min,weather_code&hourly=temperature_2m,weather_code`;

    const response = await fetch(url, {
      headers: {
        'Accept': 'application/json',
      },
    });

    if (!response.ok) {
      return null;
    }

    const data = await response.json();

    return {
      current: data.current,
      current_units: data.current_units,
      daily: data.daily,
      daily_units: data.daily_units,
      hourly: data.hourly,
      hourly_units: data.hourly_units,
    };
  } catch (error) {
    return null;
  }
}

export async function searchWeather(cityName: string): Promise<CombinedWeatherData | null> {
  const city = await searchCity(cityName);
  if (!city) return null;

  const weather = await getWeather(city.latitude, city.longitude);
  if (!weather) return null;

  return { city, weather };
}

export async function searchWeatherByCoordinates(
  lat: number,
  lon: number
): Promise<CombinedWeatherData | null> {
  const weather = await getWeather(lat, lon);
  if (!weather) return null;

  // Create a minimal city object for coordinates
  const city: GeocodingResult = {
    name: 'Current Location',
    latitude: lat,
    longitude: lon,
    country_code: '',
    timezone: 'UTC',
  };

  return { city, weather };
}
