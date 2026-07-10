import { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import type { GeocodingResult } from '../services/weather';

interface FavoriteCity extends GeocodingResult {
  id: string;
}

interface FavoritesContextType {
  favorites: FavoriteCity[];
  addFavorite: (city: GeocodingResult) => void;
  removeFavorite: (cityId: string) => void;
  isFavorite: (city: GeocodingResult) => boolean;
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

const FAVORITES_KEY = 'weatherscope_favorites';

export function FavoritesProvider({ children }: { children: ReactNode }) {
  const [favorites, setFavorites] = useState<FavoriteCity[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem(FAVORITES_KEY);
    if (stored) {
      try {
        setFavorites(JSON.parse(stored));
      } catch (error) {
        console.error('Failed to parse favorites from localStorage:', error);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
  }, [favorites]);

  const addFavorite = (city: GeocodingResult) => {
    const id = `${city.name}-${city.latitude}-${city.longitude}`;
    setFavorites((prev) => {
      if (prev.some((fav) => fav.id === id)) {
        return prev;
      }
      return [...prev, { ...city, id }];
    });
  };

  const removeFavorite = (cityId: string) => {
    setFavorites((prev) => prev.filter((fav) => fav.id !== cityId));
  };

  const isFavorite = (city: GeocodingResult) => {
    const id = `${city.name}-${city.latitude}-${city.longitude}`;
    return favorites.some((fav) => fav.id === id);
  };

  return (
    <FavoritesContext.Provider value={{ favorites, addFavorite, removeFavorite, isFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavorites() {
  const context = useContext(FavoritesContext);
  if (context === undefined) {
    throw new Error('useFavorites must be used within a FavoritesProvider');
  }
  return context;
}
