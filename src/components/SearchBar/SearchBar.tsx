import { useState } from 'react';
import type { FormEvent } from 'react';
import { useTranslation } from 'react-i18next';
import styles from './SearchBar.module.css';

interface SearchBarProps {
  onSearch: (cityName: string) => void;
  onLocationSearch: () => void;
  loading?: boolean;
}

export function SearchBar({ onSearch, onLocationSearch, loading = false }: SearchBarProps) {
  const [cityName, setCityName] = useState('');
  const { t } = useTranslation();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (cityName.trim()) {
      onSearch(cityName.trim());
    }
  };

  return (
    <form className={styles.searchBar} onSubmit={handleSubmit} role="search">
      <label htmlFor="city-search" className={styles.visuallyHidden}>
        {t('searchBar.placeholder')}
      </label>
      <input
        id="city-search"
        type="text"
        value={cityName}
        onChange={(e) => setCityName(e.target.value)}
        placeholder={t('searchBar.placeholder')}
        className={styles.input}
        disabled={loading}
        aria-label={t('searchBar.placeholder')}
      />
      <button type="submit" className={styles.button} disabled={loading} aria-label={t('searchBar.searchButton')}>
        {loading ? t('searchBar.searchButton') : t('searchBar.searchButton')}
      </button>
      <button
        type="button"
        className={styles.locationButton}
        onClick={onLocationSearch}
        disabled={loading}
        title={t('searchBar.locationButton')}
        aria-label={t('searchBar.locationButton')}
      >
        <span aria-hidden="true">📍</span>
      </button>
    </form>
  );
}
