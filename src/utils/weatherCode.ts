import { WeatherCode } from '../types/weather';

export function getWeatherDescription(code: number): string {
  const descriptions: Record<number, string> = {
    [WeatherCode.ClearSky]: 'Céu limpo',
    [WeatherCode.MainlyClear]: 'Principalmente limpo',
    [WeatherCode.PartlyCloudy]: 'Parcialmente nublado',
    [WeatherCode.Overcast]: 'Nublado',
    [WeatherCode.Fog]: 'Neblina',
    [WeatherCode.DepositingRimeFog]: 'Neblina com geada',
    [WeatherCode.LightDrizzle]: 'Garoa leve',
    [WeatherCode.ModerateDrizzle]: 'Garoa moderada',
    [WeatherCode.DenseDrizzle]: 'Garoa densa',
    [WeatherCode.LightFreezingDrizzle]: 'Garoa congelante leve',
    [WeatherCode.DenseFreezingDrizzle]: 'Garoa congelante densa',
    [WeatherCode.SlightRain]: 'Chuva leve',
    [WeatherCode.ModerateRain]: 'Chuva moderada',
    [WeatherCode.HeavyRain]: 'Chuva forte',
    [WeatherCode.LightFreezingRain]: 'Chuva congelante leve',
    [WeatherCode.HeavyFreezingRain]: 'Chuva congelante forte',
    [WeatherCode.SlightSnowFall]: 'Neve leve',
    [WeatherCode.ModerateSnowFall]: 'Neve moderada',
    [WeatherCode.HeavySnowFall]: 'Neve forte',
    [WeatherCode.SnowGrains]: 'Granizo',
    [WeatherCode.SlightRainShowers]: 'Pancadas de chuva leves',
    [WeatherCode.ModerateRainShowers]: 'Pancadas de chuva moderadas',
    [WeatherCode.ViolentRainShowers]: 'Pancadas de chuva violentas',
    [WeatherCode.SlightSnowShowers]: 'Pancadas de neve leves',
    [WeatherCode.ModerateSnowShowers]: 'Pancadas de neve moderadas',
    [WeatherCode.HeavySnowShowers]: 'Pancadas de neve fortes',
    [WeatherCode.Thunderstorm]: 'Tempestade',
    [WeatherCode.ThunderstormWithSlightHail]: 'Tempestade com granizo leve',
    [WeatherCode.ThunderstormWithHeavyHail]: 'Tempestade com granizo forte',
  };

  return descriptions[code] || 'Desconhecido';
}
