import React from 'react';
import { FiGithub, FiLinkedin, FiTwitter, FiMail, FiHeart } from 'react-icons/fi';
import { socialLinks, personalInfo } from '../../data/portfolioData';
import { useLanguage } from '../../i18n/LanguageContext';
import styles from './Footer.module.css';

/**
 * Footer avec liens réseaux sociaux
 */
const Footer = () => {
    const { content } = useLanguage();
    const currentYear = new Date().getFullYear();

    const socials = [
        { icon: FiGithub, url: socialLinks.github, label: 'GitHub' },
        { icon: FiLinkedin, url: socialLinks.linkedin, label: 'LinkedIn' },
    ];

    return (
        <footer className={styles.footer}>
            <div className={styles.container}>
                {/* Logo / Nom */}
                <div className={styles.brand}>
                    <h3 className={styles.name}>{personalInfo.name}</h3>
                    <p className={styles.tagline}>{content.personalInfo.role}</p>
                </div>

                {/* Réseaux sociaux */}
                <div className={styles.socials}>
                    {socials.map((social, index) => {
                        const Icon = social.icon;
                        return (
                            <a
                                key={index}
                                href={social.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={styles.socialLink}
                                aria-label={social.label}
                                title={social.label}
                            >
                                <Icon />
                            </a>
                        );
                    })}
                </div>
                <h5>{personalInfo.phone}</h5>
            </div>
        </footer>
    );
};

export default Footer;
