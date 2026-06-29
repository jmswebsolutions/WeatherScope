# WeatherScope

A modern web application for real-time weather information, built with React, Vite, and TypeScript.

## 📋 About the Project

WeatherScope is a weather dashboard that provides accurate and up-to-date meteorological information for any city in the world. The application uses the Open-Meteo API (free and no authentication required) to obtain geocoding and weather forecast data.

### Features

- 🔍 **City search** by name in Portuguese
- 🌡️ **Current temperature** with automatic unit
- 🌍 **Location data** (city, country, timezone)
- 🌤️ **Weather condition** with description in Portuguese
- 💨 **Detailed metrics**: humidity, feels like, precipitation, wind
- 🌙 **Day/night indication** with icons
- 📱 **Responsive interface** for desktop and mobile
- ⚡ **Optimized performance** with Vite

## 🚀 Tech Stack

- **Frontend**: React 18+
- **Build Tool**: Vite
- **Language**: TypeScript (strict mode)
- **API**: Open-Meteo (geocoding + forecast)
- **Styling**: CSS Modules

## 📁 Project Structure

```
src/
├── assets/              # Static assets (SVGs, images)
├── components/          # Reusable React components
├── services/            # Service layer (API)
├── utils/               # Pure utility functions
├── types/               # TypeScript definitions
├── hooks/               # Custom React Hooks
├── App.tsx              # Main component
└── main.tsx             # Entry point
```

## 🛠️ Installation and Setup

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Steps

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd WeatherScope
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open browser**
   Navigate to `http://localhost:5173`

### Available Commands

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run linter (ESLint)

## 📚 Documentation

For detailed information about architecture, context, and technical decisions, refer to the `docs/` folder:

- **[ARCHITECTURE.md](./docs/ARCHITECTURE.md)** - Project architecture and layer structure
- **[CONTEXT.md](./docs/CONTEXT.md)** - Context, objectives, and project requirements
- **[DATA_FLOW.md](./docs/DATA_FLOW.md)** - Data flow through the application
- **[DECISIONS.md](./docs/DECISIONS.md)** - Technical decision records (ADRs)

## 🎯 Project Scope

### Includes
- City search by name
- Current weather data display
- Responsive interface (desktop and mobile)
- Portuguese language support

### Does Not Include
- Future weather forecast
- Weather history
- Weather maps
- User authentication
- Automatic geolocation

## 🚀 Future Improvements

- [ ] Unit tests with Vitest
- [ ] E2E tests with Playwright
- [ ] PWA features (offline support, installable)
- [ ] Dark/Light mode toggle
- [ ] Save favorite cities
- [ ] 7-day weather forecast
- [ ] Hourly weather forecast
- [ ] Weather maps
- [ ] Geolocation (auto-detect user location)
- [ ] Multiple language support
- [ ] Weather alerts and notifications
- [ ] Historical weather data
- [ ] Weather comparison between cities
- [ ] Animated weather icons
- [ ] Accessibility improvements (ARIA labels, keyboard navigation)

## 🤝 Contributing

This is an educational project. To contribute:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/new-feature`)
3. Commit your changes (`git commit -m 'Add new feature'`)
4. Push to the branch (`git push origin feature/new-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License. See the LICENSE file for details.

## 🔗 Resources

- [React Documentation](https://react.dev/)
- [Vite Documentation](https://vitejs.dev/)
- [TypeScript Documentation](https://www.typescriptlang.org/)
- [Open-Meteo API](https://open-meteo.com/)

---

Built with ❤️ using React + Vite + TypeScript
