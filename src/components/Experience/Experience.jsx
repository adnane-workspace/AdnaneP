import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiBriefcase, FiBook, FiChevronDown, FiChevronUp } from 'react-icons/fi';
import { experiences } from '../../data/portfolioData';
import Section from '../Section/Section';
import Button from '../Button/Button';
import styles from './Experience.module.css';

const INITIAL_WORK_VISIBLE = 2;

/**
 * Section Expérience & Éducation
 */
const Experience = () => {
    const [showAllWork, setShowAllWork] = useState(false);
    const workExperiences = experiences.filter((exp) => exp.type === 'work');
    const education = experiences.filter((exp) => exp.type === 'education');
    const visibleWork = showAllWork
        ? workExperiences
        : workExperiences.slice(0, INITIAL_WORK_VISIBLE);
    const hasMoreWork = workExperiences.length > INITIAL_WORK_VISIBLE;

    const itemVariants = {
        hidden: { opacity: 0, x: -30 },
        visible: {
            opacity: 1,
            x: 0,
            transition: { duration: 0.6 }
        },
        exit: {
            opacity: 0,
            x: -20,
            transition: { duration: 0.25 }
        }
    };

    const TimelineItem = ({ item, index }) => (
        <motion.div
            className={styles.timelineItem}
            variants={itemVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
        >
            <div className={styles.timelineIcon}>
                {item.type === 'work' ? <FiBriefcase /> : <FiBook />}
            </div>

            <div className={styles.timelineContent}>
                <div className={styles.period}>{item.period}</div>
                <h3 className={styles.title}>{item.title}</h3>
                <div className={styles.company}>
                    {item.company} • {item.location}
                </div>
                <p className={styles.description}>{item.description}</p>

                {item.achievements && item.achievements.length > 0 && (
                    <ul className={styles.achievements}>
                        {item.achievements.map((achievement, idx) => (
                            <li key={idx}>{achievement}</li>
                        ))}
                    </ul>
                )}
            </div>
        </motion.div>
    );

    return (
        <Section id="experience">
            <h2 className="section-title">Expérience & Formation</h2>

            <div className={styles.container}>
                <div className={styles.column}>
                    <h3 className={styles.columnTitle}>
                        <FiBriefcase /> Expérience Professionnelle
                    </h3>
                    <div className={styles.timeline}>
                        <AnimatePresence initial={false}>
                            {visibleWork.map((exp, index) => (
                                <TimelineItem key={exp.id} item={exp} index={index} />
                            ))}
                        </AnimatePresence>
                    </div>
                    {hasMoreWork && (
                        <div className={styles.showMore}>
                            <Button
                                variant="outline"
                                size="medium"
                                onClick={() => setShowAllWork((prev) => !prev)}
                            >
                                {showAllWork ? (
                                    <>
                                        Voir moins <FiChevronUp />
                                    </>
                                ) : (
                                    <>
                                        Voir plus <FiChevronDown />
                                    </>
                                )}
                            </Button>
                        </div>
                    )}
                </div>

                <div className={styles.column}>
                    <h3 className={styles.columnTitle}>
                        <FiBook /> Formation
                    </h3>
                    <div className={styles.timeline}>
                        {education.map((edu, index) => (
                            <TimelineItem key={edu.id} item={edu} index={index} />
                        ))}
                    </div>
                </div>
            </div>
        </Section>
    );
};

export default Experience;
