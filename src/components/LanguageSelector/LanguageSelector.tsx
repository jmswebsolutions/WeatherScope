import { useTranslation } from 'react-i18next';
import styles from './LanguageSelector.module.css';

export function LanguageSelector() {
  const { i18n, t } = useTranslation();

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  return (
    <div className={styles.container}>
      <select
        className={styles.select}
        value={i18n.language}
        onChange={(e) => changeLanguage(e.target.value)}
        aria-label={t('language.title')}
      >
        <option value="en">English</option>
        <option value="pt-BR">Português</option>
      </select>
    </div>
  );
}
