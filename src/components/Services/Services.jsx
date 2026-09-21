import React from 'react';
import { motion } from 'framer-motion';
import { FiArrowUpRight } from 'react-icons/fi';
import { useLanguage } from '../../i18n/LanguageContext';
import Section from '../Section/Section';
import styles from './Services.module.css';

const Services = () => {
    const { t, content } = useLanguage();
    const services = content.services;

    return (
        <Section id="services">
            <p className={styles.eyebrow}>{t('services.eyebrow')}</p>
            <h2 className="section-title">{t('services.title')}</h2>
            <p className={styles.subtitle}>{t('services.subtitle')}</p>

            <div className={styles.list}>
                {services.map((service, index) => (
                    <motion.article
                        key={service.id}
                        className={styles.spotlight}
                        initial={{ opacity: 0, y: 24 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: '-60px' }}
                        transition={{ duration: 0.45, delay: index * 0.08 }}
                    >
                        <div className={styles.media}>
                            <img
                                src={service.image}
                                alt={service.title}
                                className={styles.image}
                                loading="lazy"
                            />
                            {service.featured && (
                                <span className={styles.live}>{t('services.featured')}</span>
                            )}
                        </div>

                        <div className={styles.body}>
                            <h3 className={styles.title}>{service.title}</h3>
                            <p className={styles.description}>{service.description}</p>

                            {service.url && (
                                <a
                                    href={service.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={styles.cta}
                                >
                                    {t('services.visit')}
                                    <FiArrowUpRight aria-hidden="true" />
                                </a>
                            )}
                        </div>
                    </motion.article>
                ))}
            </div>
        </Section>
    );
};

export default Services;
