import React from 'react';
import { motion } from 'framer-motion';
import {
    FaReact, FaHtml5, FaCss3Alt, FaGitAlt, FaNodeJs, FaFigma, FaPython, FaJava, FaDocker, FaPhp, FaGithub, FaLaravel, FaDatabase
} from 'react-icons/fa';
import {
    SiJavascript, SiTypescript, SiTailwindcss, SiRedux, SiOpenid
} from 'react-icons/si';
import { skills } from '../../data/portfolioData';
import { useLanguage } from '../../i18n/LanguageContext';
import Section from '../Section/Section';
import LogoLoop from '../LogoLoop/LogoLoop';
import { useTheme } from '../../context/ThemeContext';
import styles from './Skills.module.css';

/**
 * Mapping des icônes
 */
const iconMap = {
    FaReact: FaReact,
    FaHtml5: FaHtml5,
    FaCss3Alt: FaCss3Alt,
    FaGitAlt: FaGitAlt,
    FaNodeJs: FaNodeJs,
    FaFigma: FaFigma,
    FaPython: FaPython,
    FaJava: FaJava,
    FaDocker: FaDocker,
    FaPhp: FaPhp,
    FaGithub: FaGithub,
    FaLaravel: FaLaravel,
    FaDatabase: FaDatabase,
    SiJavascript: SiJavascript,
    SiTypescript: SiTypescript,
    SiTailwindcss: SiTailwindcss,
    SiRedux: SiRedux,
    SiOpenid: SiOpenid
};

/**
 * Section Compétences avec animation de défilement infini
 */
const Skills = () => {
    const { theme } = useTheme();
    const { t } = useLanguage();
    const isDarkMode = theme === 'dark';

    // Préparer les logos pour LogoLoop
    const skillLogos = skills.map((skill) => {
        const IconComponent = iconMap[skill.icon];
        return {
            node: IconComponent ? <IconComponent style={{ fontSize: '48px' }} /> : null,
            title: skill.name,
            ariaLabel: skill.name
        };
    });

    return (
        <Section id="skills">
            <motion.h2
                className="section-title"
                initial={{ opacity: 0, y: -20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
            >
                {t('skills.title')}
            </motion.h2>

            <motion.div
                className={styles.loopContainer}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
            >
                <LogoLoop
                    logos={skillLogos}
                    speed={50}
                    direction="left"
                    logoHeight={48}
                    gap={64}
                    pauseOnHover={true}
                    fadeOut={true}
                    scaleOnHover={true}
                    drakeMode={isDarkMode}
                    ariaLabel={t('skills.aria')}
                    className={styles.skillsLoop}
                />
            </motion.div>
        </Section>
    );
};

export default Skills;
