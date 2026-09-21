import React, { useState, useEffect } from 'react';
import { FiMenu, FiX } from 'react-icons/fi';
import ThemeToggle from '../ThemeToggle/ThemeToggle';
import LanguageSwitcher from '../LanguageSwitcher/LanguageSwitcher';
import { useTheme } from '../../context/ThemeContext';
import { useLanguage } from '../../i18n/LanguageContext';
import styles from './Navbar.module.css';

/**
 * Barre de navigation responsive avec menu mobile
 */
const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [activeSection, setActiveSection] = useState('hero');
    const { theme } = useTheme();
    const { t } = useLanguage();

    // Détecter le scroll pour changer le style de la navbar
    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Fermer le menu mobile lors du redimensionnement vers desktop
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth > 768 && isMobileMenuOpen) {
                setIsMobileMenuOpen(false);
            }
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [isMobileMenuOpen]);

    // Verrouiller le scroll quand le menu mobile est ouvert
    useEffect(() => {
        if (isMobileMenuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
    }, [isMobileMenuOpen]);

    const navItems = [
        { key: 'home', href: '#hero' },
        { key: 'events', href: '#events' },
        { key: 'services', href: '#services' },
        { key: 'skills', href: '#skills' },
        { key: 'projects', href: '#projects' },
        { key: 'experience', href: '#experience' },
        { key: 'contact', href: '#contact' }
    ];

    useEffect(() => {
        const ids = navItems.map((item) => item.href.slice(1));
        const observer = new IntersectionObserver(
            (entries) => {
                const visible = entries
                    .filter((entry) => entry.isIntersecting)
                    .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
                if (visible?.target?.id) {
                    setActiveSection(visible.target.id);
                }
            },
            { rootMargin: '-35% 0px -50% 0px', threshold: [0, 0.2, 0.5] }
        );

        ids.forEach((id) => {
            const el = document.getElementById(id);
            if (el) observer.observe(el);
        });

        return () => observer.disconnect();
    }, []);

    // Fermer le menu mobile lors du clic sur un lien
    const handleNavClick = () => {
        setIsMobileMenuOpen(false);
    };

    // Logo selon le thème
    const logoSrc = theme === 'dark'
        ? '/images/logo-dark.png'
        : '/images/logo-light.png';

    return (
        <nav className={`${styles.navbar} ${isScrolled ? styles.scrolled : ''}`}>
            <div className={styles.container}>
                {/* Logo */}
                <a href="#hero" className={styles.logo}>
                    <img
                        src={logoSrc}
                        alt="Adnane"
                        className={styles.logoImage}
                        onError={(e) => {
                            e.target.style.display = 'none';
                            e.target.nextSibling.style.display = 'block';
                        }}
                    />
                    <span className={styles.logoText} style={{ display: 'none' }}>ADNANE</span>
                </a>

                {/* Navigation Desktop */}
                <ul className={styles.navLinks}>
                    {navItems.map((item) => (
                        <li key={item.key}>
                            <a
                                href={item.href}
                                className={`${styles.navLink} ${activeSection === item.href.slice(1) ? styles.navLinkActive : ''}`}
                            >
                                {t(`nav.${item.key}`)}
                            </a>
                        </li>
                    ))}
                </ul>

                {/* Actions (Theme Toggle + Mobile Menu) */}
                <div className={styles.actions}>
                    <LanguageSwitcher />
                    <ThemeToggle />

                    {/* Bouton Menu Mobile */}
                    <button
                        className={styles.mobileMenuButton}
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        aria-label={isMobileMenuOpen ? t('nav.closeMenu') : t('nav.openMenu')}
                        aria-expanded={isMobileMenuOpen}
                    >
                        {isMobileMenuOpen ? <FiX /> : <FiMenu />}
                    </button>
                </div>

                {/* Overlay pour fermer le menu au clic extérieur */}
                <div
                    className={`${styles.overlay} ${isMobileMenuOpen ? styles.visible : ''}`}
                    onClick={() => setIsMobileMenuOpen(false)}
                />

                {/* Menu Mobile */}
                <div className={`${styles.mobileMenu} ${isMobileMenuOpen ? styles.open : ''}`}>
                    <ul className={styles.mobileNavLinks}>
                        {navItems.map((item, index) => (
                            <li
                                key={item.key}
                                style={{
                                    transitionDelay: `${index * 50 + 100}ms`,
                                    opacity: isMobileMenuOpen ? 1 : 0,
                                    transform: isMobileMenuOpen ? 'translateX(0)' : 'translateX(20px)',
                                    transition: 'all 0.4s ease-out'
                                }}
                            >
                                <a
                                    href={item.href}
                                    className={`${styles.mobileNavLink} ${activeSection === item.href.slice(1) ? styles.mobileNavLinkActive : ''}`}
                                    onClick={handleNavClick}
                                >
                                    {t(`nav.${item.key}`)}
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </nav>
    );
};


export default Navbar;
