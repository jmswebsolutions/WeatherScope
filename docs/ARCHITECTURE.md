# WeatherScope Architecture

## Overview

WeatherScope is a weather web application built with React + Vite, following a layered architecture for separation of concerns and maintainability.

## Layer Structure

```
┌─────────────────────────────────────────────────────────┐
│                    Presentation Layer                     │
│  (React Components - UI, States, User Interaction)      │
└─────────────────────────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────┐
│                      Business Logic                      │
│  (Custom Hooks, State Management, Validation)           │
└─────────────────────────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────┐
│                      Service Layer                       │
│  (API Communication - Open-Meteo Integration)           │
└─────────────────────────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────┐
│                      External API                         │
│  (Open-Meteo - Geocoding & Weather Data)                │
└─────────────────────────────────────────────────────────┘
```

## Directory Structure

```
src/
├── assets/              # Static assets (SVGs, images)
├── components/          # Reusable React components
│   ├── SearchBar.tsx    # Search component
│   ├── WeatherCard.tsx  # Main weather card
│   ├── Sidebar.tsx      # Sidebar with main data
│   └── Metrics.tsx      # Secondary metrics
├── services/            # Service layer (API)
│   └── openMeteo.ts     # Open-Meteo integration
├── utils/               # Pure utility functions
│   ├── weatherCode.ts   # WMO → Portuguese mapping
│   └── windDirection.ts # Degrees → cardinal conversion
├── types/               # TypeScript definitions
│   └── weather.ts       # API interfaces
├── hooks/               # Custom React Hooks
│   └── useWeather.ts    # Weather logic hook
├── App.tsx              # Main component
└── main.tsx             # Entry point
```

## Responsibilities by Layer

### Presentation Layer (Components)
- **Responsibility:** Render UI and manage user interactions
- **Technologies:** React, CSS Modules/TailwindCSS
- **Principles:** Functional components, hooks, separation of concerns

### Business Logic (Hooks)
- **Responsibility:** Orchestrate business logic and manage states
- **Technologies:** React Hooks (useState, useEffect, useCallback)
- **Principles:** Reusable custom hooks, separation of UI logic

### Service Layer
- **Responsibility:** Communication with external APIs
- **Technologies:** Fetch API, TypeScript
- **Principles:** API abstraction, error handling, validation

### Utils Layer
- **Responsibility:** Pure functions for data transformation
- **Technologies:** TypeScript
- **Principles:** Purity, testability, immutability

## Design Patterns

### 1. Separation of Concerns
Each layer has a single, well-defined responsibility, avoiding coupling.

### 2. Dependency Injection
Components receive dependencies via props, facilitating testing.

### 3. Error Boundary
Implementation of Error Boundaries to catch errors in React components.

### 4. State Management
Use of React Context for global state (if needed), useState for local state.

## Data Flow

1. **User Input** → SearchBar Component
2. **Validation** → useWeather Hook
3. **API Call** → Service Layer (openMeteo.ts)
4. **Data Transformation** → Utils (weatherCode, windDirection)
5. **State Update** → useWeather Hook
6. **UI Re-render** → React Components

## Scalability Considerations

- **Modularity:** Each module can be tested and replaced independently
- **Type Safety:** TypeScript ensures contracts between layers
- **Performance:** React.memo and useCallback for re-render optimization
- **Maintainability:** Clear structure facilitates developer onboarding
