export interface GeocodingResult {
  name: string;
  latitude: number;
  longitude: number;
  country_code: string;
  timezone: string;
}

export interface WeatherData {
  current: {
    temperature_2m: number;
    relative_humidity_2m: number;
    apparent_temperature: number;
    precipitation: number;
    wind_speed_10m: number;
    wind_direction_10m: number;
    is_day: number;
    weather_code: number;
  };
  current_units: {
    [key: string]: string;
  };
  daily?: {
    time: string[];
    temperature_2m_max: number[];
    temperature_2m_min: number[];
    weather_code: number[];
  };
  daily_units?: {
    [key: string]: string;
  };
  hourly?: {
    time: string[];
    temperature_2m: number[];
    weather_code: number[];
  };
  hourly_units?: {
    [key: string]: string;
  };
}

export interface CombinedWeatherData {
  city: GeocodingResult;
  weather: WeatherData;
}

export const WeatherCode = {
  ClearSky: 0,
  MainlyClear: 1,
  PartlyCloudy: 2,
  Overcast: 3,
  Fog: 45,
  DepositingRimeFog: 48,
  LightDrizzle: 51,
  ModerateDrizzle: 53,
  DenseDrizzle: 55,
  LightFreezingDrizzle: 56,
  DenseFreezingDrizzle: 57,
  SlightRain: 61,
  ModerateRain: 63,
  HeavyRain: 65,
  LightFreezingRain: 66,
  HeavyFreezingRain: 67,
  SlightSnowFall: 71,
  ModerateSnowFall: 73,
  HeavySnowFall: 75,
  SnowGrains: 77,
  SlightRainShowers: 80,
  ModerateRainShowers: 81,
  ViolentRainShowers: 82,
  SlightSnowShowers: 85,
  ModerateSnowShowers: 86,
  HeavySnowShowers: 87,
  Thunderstorm: 95,
  ThunderstormWithSlightHail: 96,
  ThunderstormWithHeavyHail: 99,
} as const;
