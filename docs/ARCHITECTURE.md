# WeatherScope Architecture

## Overview

WeatherScope is a weather web application built with React + Vite, following a layered architecture with unidirectional dependencies for separation of concerns and maintainability.

## Layer Structure

```
┌─────────────────────────────────────────────────────────┐
│                  Presentation Layer                      │
│  (React Components - UI, States, User Interaction)      │
└─────────────────────────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────┐
│                Business Logic Layer                      │
│  (Custom Hooks, Services, State Management)              │
└─────────────────────────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────┐
│                     Data Layer                           │
│  (Types, API Calls, Data Models)                        │
└─────────────────────────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────┐
│                      External API                         │
│  (Open-Meteo - Geocoding & Weather Data)                │
└─────────────────────────────────────────────────────────┘
```

**Note:** Utils are global helpers, not a layer. They can be used by any layer.

## Directory Structure

```
src/
├── assets/              # Static assets (SVGs, images)
├── components/          # Reusable React components
│   ├── SearchBar/       # Search component
│   └── WeatherCard/     # Main weather card
├── services/            # Business Logic + Data Layer
│   ├── openMeteo.ts     # Open-Meteo integration
│   └── weather.ts       # Weather data types
├── utils/               # Global utility functions
│   ├── weatherCode.ts   # WMO → Portuguese mapping
│   └── windDirection.ts # Degrees → cardinal conversion
├── hooks/               # Custom React Hooks
│   └── useWeather.ts    # Weather logic hook
├── App.tsx              # Main component
└── main.tsx             # Entry point
```

## Responsibilities by Layer

### Presentation Layer (Components)
- **Responsibility:** Render UI and manage user interactions
- **Technologies:** React, CSS Modules
- **Principles:** Functional components, hooks, separation of concerns
- **Dependencies:** Business Logic Layer only

### Business Logic Layer (Hooks + Services)
- **Responsibility:** Orchestrate business logic, manage states, API communication
- **Technologies:** React Hooks (useState, useEffect), Fetch API, TypeScript
- **Principles:** Reusable custom hooks, API abstraction, error handling
- **Dependencies:** Data Layer only

### Data Layer
- **Responsibility:** Type definitions, data models, API contracts
- **Technologies:** TypeScript interfaces, types
- **Principles:** Type safety, clear contracts
- **Dependencies:** None (base layer)

### Utils (Global Helpers)
- **Responsibility:** Pure functions for data transformation
- **Technologies:** TypeScript
- **Principles:** Purity, testability, immutability
- **Dependencies:** Can be used by any layer

## Design Patterns

### 1. Separation of Concerns
Each layer has a single, well-defined responsibility, avoiding coupling.

### 2. Unidirectional Dependencies
Upper layers depend only on lower layers, preventing circular dependencies.

### 3. Dependency Injection
Components receive dependencies via props, facilitating testing.

### 4. Type Safety
TypeScript ensures contracts между layers and prevents runtime errors.

## Data Flow

1. **User Input** → SearchBar Component (Presentation)
2. **Validation** → useWeather Hook (Business Logic)
3. **API Call** → Service Layer (Business Logic)
4. **Data Transformation** → Utils (Global Helpers)
5. **State Update** → useWeather Hook (Business Logic)
6. **UI Re-render** → React Components (Presentation)

## Dependency Rules

- **Presentation Layer** → depends on Business Logic Layer
- **Business Logic Layer** → depends on Data Layer
- **Data Layer** → no dependencies (base layer)
- **Utils** → can be used by any layer (global helpers)

## Scalability Considerations

- **Modularity:** Each module can be tested and replaced independently
- **Type Safety:** TypeScript ensures contracts between layers
- **Performance:** React.memo and useCallback for re-render optimization
- **Maintainability:** Clear structure facilitates developer onboarding
- **Testability:** Layers can be tested independently due to unidirectional dependencies
