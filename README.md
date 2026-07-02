# WeatherScope

A modern weather application built with React, TypeScript, and Vite. WeatherScope provides real-time weather information for any city worldwide using the Open-Meteo API.

## Features

- Real-time weather data for any city
- Temperature, humidity, wind speed, and precipitation metrics
- Clean and intuitive interface
- Responsive design
- Fast and lightweight
- No API key required

## Tech Stack

- **Frontend Framework:** React 18+
- **Build Tool:** Vite
- **Language:** TypeScript (strict mode)
- **API:** Open-Meteo (free, no API key)
- **Styling:** CSS Modules
- **State Management:** React Hooks
- **Deployment:** GitHub Pages

## Project Structure

```
src/
├── assets/          # Static assets
├── components/      # React components
│   ├── SearchBar/   # City search input
│   └── WeatherCard/ # Weather display card
├── services/        # API integration
│   └── openMeteo.ts # Open-Meteo API service
├── utils/           # Utility functions
│   ├── weatherCode.ts    # Weather code descriptions
│   └── windDirection.ts  # Wind direction conversion
├── types/           # TypeScript definitions
│   └── weather.ts   # Weather data types
├── hooks/           # Custom React hooks
│   └── useWeather.ts # Weather state management
├── App.tsx          # Main application component
├── App.css          # Global styles
└── main.tsx         # Application entry point
```

## Getting Started

### Prerequisites

- Node.js 20+ 
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/jmswebsolutions/WeatherScope.git
cd WeatherScope

# Install dependencies
npm install

# Start development server
npm run dev
```

### Build

```bash
# Build for production
npm run build

# Preview production build
npm run preview
```

## Usage

1. Open the application in your browser
2. Enter a city name in the search bar
3. View current weather conditions including:
   - Temperature
   - Feels like temperature
   - Humidity
   - Wind speed and direction
   - Precipitation

## Architecture

WeatherScope follows a layered architecture:

- **Types Layer:** TypeScript interfaces and type definitions
- **Service Layer:** API integration and data fetching
- **Utils Layer:** Pure utility functions
- **Business Logic Layer:** Custom React hooks
- **Presentation Layer:** React components

For detailed architecture documentation, see [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md).

## Documentation

- [Architecture](docs/ARCHITECTURE.md) - System architecture and design patterns
- [Context](docs/CONTEXT.md) - Project objectives and requirements
- [Data Flow](docs/DATA_FLOW.md) - Application data flow and state management
- [Decisions](docs/DECISIONS.md) - Architecture Decision Records (ADRs)

## Future Improvements

- [x] React + Vite + TypeScript setup
- [x] Project structure (components, services, utils, types, hooks, assets)
- [x] TypeScript strict mode
- [x] Open-Meteo API integration
- [x] SearchBar component
- [x] WeatherCard component
- [x] useWeather custom hook
- [x] CSS Modules styling
- [x] GitHub Actions CI/CD
- [x] GitHub Pages deployment
- [ ] 7-day weather forecast
- [ ] Hourly forecast
- [ ] Weather maps
- [ ] Geolocation support
- [ ] Dark mode
- [ ] Favorite cities
- [ ] PWA features
- [ ] Multi-language support
- [ ] Weather alerts
- [ ] Accessibility improvements

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License.

## Resources

- [React Documentation](https://react.dev/)
- [Vite Documentation](https://vitejs.dev/)
- [TypeScript Documentation](https://www.typescriptlang.org/)
- [Open-Meteo API](https://open-meteo.com/)

## Live Demo

Check out the live application: [https://jmswebsolutions.com.br/WeatherScope/](https://jmswebsolutions.com.br/WeatherScope/)
