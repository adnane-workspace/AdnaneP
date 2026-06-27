import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { about, personalInfo } from '../../data/portfolioData';
import Section from '../Section/Section';
import styles from './About.module.css';

/**
 * Section À Propos
 */
const About = () => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentImageIndex((prev) => (prev + 1) % personalInfo.avatars.length);
        }, 2000);
        return () => clearInterval(interval);
    }, []);

    return (
        <Section id="about">
            <h2 className="section-title">À Propos de Moi</h2>

            <div className={styles.content}>
                {/* Image de profil */}
                <motion.div
                    className={styles.imageWrapper}
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <div className={styles.imageContainer}>
                        <AnimatePresence mode="popLayout">
                            <motion.img
                                key={currentImageIndex}
                                src={personalInfo.avatars[currentImageIndex]}
                                alt={personalInfo.name}
                                className={styles.imagePlaceholder}
                                initial={{ opacity: 0, scale: 1.08, filter: "blur(4px)" }}
                                animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                                exit={{ opacity: 0, scale: 0.94, filter: "blur(4px)" }}
                                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                            />
                        </AnimatePresence>
                        <div className={styles.imageDecoration}></div>
                    </div>
                </motion.div>

                {/* Texte */}
                <motion.div
                    className={styles.text}
                    initial={{ opacity: 0, x: 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                >
                    <p className={styles.bio}>{about.bio}</p>

                    {/* Statistiques */}
                    <div className={styles.stats}>
                        {about.stats.map((stat, index) => (
                            <motion.div
                                key={index}
                                className={styles.stat}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.4, delay: 0.4 + index * 0.1 }}
                            >
                                <div className={styles.statValue}>{stat.value}</div>
                                <div className={styles.statLabel}>{stat.label}</div>
                            </motion.div>
                        ))}
                    </div>

                    {/* Centres d'intérêt */}
                    <div className={styles.interests}>
                        <h3 className={styles.interestsTitle}>Centres d'intérêt</h3>
                        <div className={styles.interestsList}>
                            {about.interests.map((interest, index) => (
                                <motion.span
                                    key={index}
                                    className={styles.interestTag}
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.3, delay: 0.6 + index * 0.05 }}
                                    whileHover={{ scale: 1.05 }}
                                >
                                    {interest}
                                </motion.span>
                            ))}
                        </div>
                    </div>
                </motion.div>
            </div>
        </Section>
    );
};

export default About;
