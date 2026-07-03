import { WeatherCode } from '../services/weather';

export function getWeatherDescription(code: number): string {
  const descriptions: Record<number, string> = {
    [WeatherCode.ClearSky]: 'Clear sky',
    [WeatherCode.MainlyClear]: 'Mainly clear',
    [WeatherCode.PartlyCloudy]: 'Partly cloudy',
    [WeatherCode.Overcast]: 'Overcast',
    [WeatherCode.Fog]: 'Fog',
    [WeatherCode.DepositingRimeFog]: 'Depositing rime fog',
    [WeatherCode.LightDrizzle]: 'Light drizzle',
    [WeatherCode.ModerateDrizzle]: 'Moderate drizzle',
    [WeatherCode.DenseDrizzle]: 'Dense drizzle',
    [WeatherCode.LightFreezingDrizzle]: 'Light freezing drizzle',
    [WeatherCode.DenseFreezingDrizzle]: 'Dense freezing drizzle',
    [WeatherCode.SlightRain]: 'Slight rain',
    [WeatherCode.ModerateRain]: 'Moderate rain',
    [WeatherCode.HeavyRain]: 'Heavy rain',
    [WeatherCode.LightFreezingRain]: 'Light freezing rain',
    [WeatherCode.HeavyFreezingRain]: 'Heavy freezing rain',
    [WeatherCode.SlightSnowFall]: 'Slight snow fall',
    [WeatherCode.ModerateSnowFall]: 'Moderate snow fall',
    [WeatherCode.HeavySnowFall]: 'Heavy snow fall',
    [WeatherCode.SnowGrains]: 'Snow grains',
    [WeatherCode.SlightRainShowers]: 'Slight rain showers',
    [WeatherCode.ModerateRainShowers]: 'Moderate rain showers',
    [WeatherCode.ViolentRainShowers]: 'Violent rain showers',
    [WeatherCode.SlightSnowShowers]: 'Slight snow showers',
    [WeatherCode.ModerateSnowShowers]: 'Moderate snow showers',
    [WeatherCode.HeavySnowShowers]: 'Heavy snow showers',
    [WeatherCode.Thunderstorm]: 'Thunderstorm',
    [WeatherCode.ThunderstormWithSlightHail]: 'Thunderstorm with slight hail',
    [WeatherCode.ThunderstormWithHeavyHail]: 'Thunderstorm with heavy hail',
  };

  return descriptions[code] || 'Unknown';
}
