# WeatherScope Data Flow

## Overview

This document describes how data flows through the application, from user input to display in the interface.

## Data Flow Diagram

```
┌──────────────┐
│    User     │
│  (Input)     │
└──────┬───────┘
       │
       ▼
┌──────────────┐
│  SearchBar   │
│  Component   │
└──────┬───────┘
       │ (cityName)
       ▼
┌──────────────┐
│ useWeather   │
│   Hook       │
└──────┬───────┘
       │ (validation)
       ▼
┌──────────────┐
│ openMeteo    │
│   Service    │
└──────┬───────┘
       │
       ├──────────────────┐
       │                  │
       ▼                  ▼
┌──────────────┐   ┌──────────────┐
│ searchCity   │   │ getWeather   │
│ (Geocoding)  │   │  (Forecast)  │
└──────┬───────┘   └──────┬───────┘
       │                   │
       │ (lat, lon, tz)    │ (weather data)
       └────────┬──────────┘
                │
                ▼
       ┌──────────────┐
       │ searchWeather│
       │ (Orchestration)
       └──────┬───────┘
              │
              ▼
       ┌──────────────┐
       │ CombinedData │
       └──────┬───────┘
              │
              ├──────────────────┐
              │                  │
              ▼                  ▼
       ┌──────────────┐   ┌──────────────┐
       │ weatherCode  │   │windDirection │
       │  (WMO→PT)    │   │ (deg→cardinal)│
       └──────┬───────┘   └──────┬───────┘
              │                   │
              └────────┬──────────┘
                       │
                       ▼
              ┌──────────────┐
              │  Formatted   │
              │    Data      │
              └──────┬───────┘
                     │
                     ▼
              ┌──────────────┐
              │ React State  │
              └──────┬───────┘
                     │
                     ▼
              ┌──────────────┐
              │   UI Render  │
              └──────────────┘
```

## Detailed Flow

### 1. Input Capture

**Component:** `SearchBar.tsx`

```typescript
// User types city name
onChange: (e: React.ChangeEvent<HTMLInputElement>) => void

// User presses Enter or clicks button
onSubmit: (cityName: string) => void
```

**Data:**
- Input: raw string from user
- Output: trimmed and validated string

### 2. Validation

**Hook:** `useWeather.ts`

```typescript
const validateInput = (cityName: string): boolean => {
  return cityName.trim().length > 0
}
```

**Rules:**
- Input cannot be empty after trim
- Input cannot contain only spaces
- If invalid: does not trigger request

### 3. API Call - Geocoding

**Service:** `openMeteo.ts` - `searchCity()`

```typescript
searchCity(cityName: string): Promise<GeocodingResult | null>
```

**Endpoint:** `https://geocoding-api.open-meteo.com/v1/search`

**Parameters:**
- `name`: city name
- `count`: 1 (only first result)
- `language`: pt

**Response:**
```typescript
{
  name: string
  latitude: number
  longitude: number
  country_code: string
  timezone: string
} | null
```

**Error Handling:**
- No results → `null`
- Network error → `null`
- Invalid response → `null`

### 4. API Call - Forecast

**Service:** `openMeteo.ts` - `getWeather()`

```typescript
getWeather(lat: number, lon: number, tz: string): Promise<WeatherData | null>
```

**Endpoint:** `https://api.open-meteo.com/v1/forecast`

**Parameters:**
- `latitude`: from geocoding
- `longitude`: from geocoding
- `timezone`: from geocoding
- `current`: temperature_2m, relative_humidity_2m, apparent_temperature, precipitation, wind_speed_10m, wind_direction_10m, is_day, weather_code

**Response:**
```typescript
{
  current: {
    temperature_2m: number
    relative_humidity_2m: number
    apparent_temperature: number
    precipitation: number
    wind_speed_10m: number
    wind_direction_10m: number
    is_day: number
    weather_code: number
  }
  current_units: {
    [key: string]: string
  }
} | null
```

### 5. Orchestration

**Service:** `openMeteo.ts` - `searchWeather()`

```typescript
async searchWeather(cityName: string): Promise<CombinedWeatherData | null> {
  // 1. Geocoding
  const city = await searchCity(cityName)
  if (!city) return null

  // 2. Forecast
  const weather = await getWeather(city.latitude, city.longitude, city.timezone)
  if (!weather) return null

  // 3. Combine
  return { city, weather }
}
```

**Characteristics:**
- Sequential: geocoding before forecast
- Fail-fast: any error returns `null`
- Strong typing: TypeScript ensures structure

### 6. Data Transformation

**Utils:** `weatherCode.ts`

```typescript
getWeatherDescription(code: number): string
```

**Mapping:** WMO code → Portuguese description

**Utils:** `windDirection.ts`

```typescript
getWindDirection(degrees: number): string
```

**Mapping:** Degrees → cardinal direction (N, NE, E, SE, S, SO, O, NO)

### 7. State Update

**Hook:** `useWeather.ts`

```typescript
const [weatherData, setWeatherData] = useState<CombinedWeatherData | null>(null)
const [loading, setLoading] = useState(false)
const [error, setError] = useState(false)
```

**States:**
- `empty`: initial state, no data
- `loading`: during requests
- `result`: data loaded successfully
- `error`: failure (returns to empty state)

### 8. UI Rendering

**Components:**
- `WeatherCard.tsx`: main container
- `Sidebar.tsx`: main data (temperature, city, condition)
- `Metrics.tsx`: secondary metrics (humidity, wind, etc.)

**Render Flow:**
```
State Change → Re-render → DOM Update
```

## Application States

### State Machine

```
┌────────┐
│  Empty │ ←────────────────┐
└───┬────┘                  │
    │ (valid input)         │ (failure)
    ▼                       │
┌────────┐                  │
│ Loading│                  │
└───┬────┘                  │
    │ (success)             │
    ▼                       │
┌────────┐                  │
│ Result │ ─────────────────┘
└────────┘
```

### Transitions

1. **Empty → Loading**: User submits valid search
2. **Loading → Result**: API returns data successfully
3. **Loading → Empty**: API fails or city not found
4. **Result → Empty**: User performs new search (optional)

## Error Handling

### Strategy

- **Silent Failure:** Errors do not show explicit messages to user
- **Empty State:** Failures return to initial state
- **Logging:** Errors are logged to console for debug

### Error Types

1. **Invalid Input:** Does not trigger request
2. **City Not Found:** Returns `null` → empty state
3. **Network Error:** Returns `null` → empty state
4. **Invalid Response:** Returns `null` → empty state

## Performance Considerations

### Optimizations

- **Debounce:** (optional) to avoid multiple requests
- **Memoization:** React.memo for components
- **useCallback:** for functions passed as props
- **Lazy Loading:** (optional) for heavy components

### Metrics

- **Time to Interactive:** < 2 seconds
- **First Contentful Paint:** < 1 second
- **API Response:** < 500ms (p99)
