import React from 'react';
import { useLanguage } from '../../i18n/LanguageContext';
import styles from './LanguageSwitcher.module.css';

const LanguageSwitcher = () => {
    const { lang, setLang, t } = useLanguage();

    return (
        <div className={styles.switcher} role="group" aria-label={t('language.label')}>
            <button
                type="button"
                className={`${styles.option} ${lang === 'fr' ? styles.active : ''}`}
                onClick={() => setLang('fr')}
                aria-pressed={lang === 'fr'}
                aria-label={t('language.fr')}
            >
                FR
            </button>
            <button
                type="button"
                className={`${styles.option} ${lang === 'en' ? styles.active : ''}`}
                onClick={() => setLang('en')}
                aria-pressed={lang === 'en'}
                aria-label={t('language.en')}
            >
                EN
            </button>
        </div>
    );
};

export default LanguageSwitcher;
