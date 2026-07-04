import { useState } from 'react';
import type { CombinedWeatherData } from '../services/weather';
import { searchWeather, searchWeatherByCoordinates } from '../services/openMeteo';

export function useWeather() {
  const [weatherData, setWeatherData] = useState<CombinedWeatherData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const validateInput = (cityName: string): boolean => {
    return cityName.trim().length > 0;
  };

  const search = async (cityName: string) => {
    if (!validateInput(cityName)) {
      return;
    }

    setLoading(true);
    setError(false);

    try {
      const data = await searchWeather(cityName);

      if (data) {
        setWeatherData(data);
      } else {
        setError(true);
        setWeatherData(null);
      }
    } catch (err) {
      setError(true);
      setWeatherData(null);
    } finally {
      setLoading(false);
    }
  };

  const searchByLocation = async () => {
    if (!navigator.geolocation) {
      setError(true);
      return;
    }

    setLoading(true);
    setError(false);

    try {
      const position = await new Promise<GeolocationPosition>((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject);
      });

      const { latitude, longitude } = position.coords;
      const data = await searchWeatherByCoordinates(latitude, longitude);

      if (data) {
        setWeatherData(data);
      } else {
        setError(true);
        setWeatherData(null);
      }
    } catch (err) {
      setError(true);
      setWeatherData(null);
    } finally {
      setLoading(false);
    }
  };

  return {
    weatherData,
    loading,
    error,
    search,
    searchByLocation,
  };
}
