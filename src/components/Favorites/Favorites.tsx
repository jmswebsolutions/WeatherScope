import { useFavorites } from '../../contexts/FavoritesContext';
import styles from './Favorites.module.css';

export function Favorites() {
  const { favorites, removeFavorite } = useFavorites();

  if (favorites.length === 0) {
    return null;
  }

  return (
    <div className={styles.container}>
      <h3 className={styles.title}>Favorite Cities</h3>
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
              title="Remove from favorites"
              aria-label={`Remove ${city.name} from favorites`}
            >
              ✕
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
