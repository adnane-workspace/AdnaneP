import React from 'react';
import { FiSun, FiMoon } from 'react-icons/fi';
import { useTheme } from '../../context/ThemeContext';
import { useLanguage } from '../../i18n/LanguageContext';
import styles from './ThemeToggle.module.css';

/**
 * Composant pour basculer entre le mode clair et sombre
 */
const ThemeToggle = () => {
    const { theme, toggleTheme } = useTheme();
    const { t } = useLanguage();

    return (
        <button
            className={styles.toggle}
            onClick={toggleTheme}
            aria-label={t('theme.toggle')}
            title={theme === 'light' ? t('theme.toDark') : t('theme.toLight')}
        >
            <div className={`${styles.iconWrapper} ${theme === 'dark' ? styles.dark : ''}`}>
                <FiSun className={styles.sunIcon} />
                <FiMoon className={styles.moonIcon} />
            </div>
        </button>
    );
};

export default ThemeToggle;
