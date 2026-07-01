import { useState } from 'react';
import type { FormEvent } from 'react';
import styles from './SearchBar.module.css';

interface SearchBarProps {
  onSearch: (cityName: string) => void;
  loading?: boolean;
}

export function SearchBar({ onSearch, loading = false }: SearchBarProps) {
  const [cityName, setCityName] = useState('');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (cityName.trim()) {
      onSearch(cityName.trim());
    }
  };

  return (
    <form className={styles.searchBar} onSubmit={handleSubmit}>
      <input
        type="text"
        value={cityName}
        onChange={(e) => setCityName(e.target.value)}
        placeholder="Digite o nome da cidade..."
        className={styles.input}
        disabled={loading}
      />
      <button type="submit" className={styles.button} disabled={loading}>
        {loading ? 'Buscando...' : 'Buscar'}
      </button>
    </form>
  );
}
