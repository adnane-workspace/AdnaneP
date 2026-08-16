import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiGithub, FiExternalLink, FiChevronDown, FiChevronUp } from 'react-icons/fi';
import { useLanguage } from '../../i18n/LanguageContext';
import Section from '../Section/Section';
import Card from '../Card/Card';
import Button from '../Button/Button';
import styles from './Projects.module.css';

const INITIAL_VISIBLE = 3;

/**
 * Section Projets
 */
const Projects = () => {
    const [showAll, setShowAll] = useState(false);
    const { t, content } = useLanguage();
    const projects = content.projects;
    const visibleProjects = showAll ? projects : projects.slice(0, INITIAL_VISIBLE);
    const hasMore = projects.length > INITIAL_VISIBLE;

    const handleToggle = () => {
        if (showAll) {
            document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
        setShowAll((prev) => !prev);
    };

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.15
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.6 }
        },
        exit: {
            opacity: 0,
            y: 20,
            transition: { duration: 0.3 }
        }
    };

    return (
        <Section id="projects">
            <h2 className="section-title">{t('projects.title')}</h2>
            <p className={styles.subtitle}>
                {t('projects.subtitle')}
            </p>

            <motion.div
                className={styles.grid}
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
            >
                <AnimatePresence initial={false}>
                    {visibleProjects.map((project) => (
                        <motion.div
                            key={project.id}
                            variants={itemVariants}
                            initial="hidden"
                            animate="visible"
                            exit="exit"
                            layout
                        >
                            <Card hover={true} className={styles.projectCard}>
                                <div className={styles.imageContainer}>
                                    <img
                                        src={project.image}
                                        alt={project.title}
                                        className={styles.projectImage}
                                        loading="lazy"
                                    />
                                    {project.featured && (
                                        <span className={styles.featuredBadge}>{t('projects.featured')}</span>
                                    )}
                                </div>

                                <div className={styles.content}>
                                    <h3 className={styles.title}>{project.title}</h3>
                                    <p className={styles.description}>{project.description}</p>

                                    <div className={styles.tags}>
                                        {project.tags.map((tag, index) => (
                                            <span key={index} className={styles.tag}>
                                                {tag}
                                            </span>
                                        ))}
                                    </div>

                                    <div className={styles.links}>
                                        {project.github && (
                                            <a
                                                href={project.github}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className={styles.link}
                                            >
                                                <FiGithub /> {t('projects.code')}
                                            </a>
                                        )}
                                        {project.demo && (
                                            <a
                                                href={project.demo}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className={styles.link}
                                            >
                                                <FiExternalLink /> {t('projects.demo')}
                                            </a>
                                        )}
                                    </div>
                                </div>
                            </Card>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </motion.div>

            {hasMore && (
                <div className={styles.showMore}>
                    <Button variant="outline" size="medium" onClick={handleToggle}>
                        {showAll ? (
                            <>
                                {t('projects.less')} <FiChevronUp />
                            </>
                        ) : (
                            <>
                                {t('projects.more')} <FiChevronDown />
                            </>
                        )}
                    </Button>
                </div>
            )}
        </Section>
    );
};

export default Projects;
