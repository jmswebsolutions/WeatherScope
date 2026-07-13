import { useFavorites } from '../../contexts/FavoritesContext';
import { useTranslation } from 'react-i18next';
import styles from './Favorites.module.css';

export function Favorites() {
  const { favorites, removeFavorite } = useFavorites();
  const { t } = useTranslation();

  if (favorites.length === 0) {
    return null;
  }

  return (
    <div className={styles.container}>
      <h3 className={styles.title}>{t('favorites.title')}</h3>
      <div className={styles.list}>
        {favorites.map((city) => (
          <div key={city.id} className={styles.item}>
            <div className={styles.cityInfo}>
              <span className={styles.cityName}>{city.name}</span>
              <span className={styles.country}>{city.country_code}</span>
            </div>
            <button
              className={styles.removeButton}
              onClick={() => removeFavorite(city.id)}
              title={t('favorites.remove')}
              aria-label={`${t('favorites.remove')} ${city.name}`}
            >
              ✕
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
