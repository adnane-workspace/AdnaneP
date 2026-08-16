import React, { createContext, useCallback, useContext, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import {
    about as aboutMeta,
    events as eventsMeta,
    experiences as experiencesMeta,
    personalInfo as personalMeta,
    projects as projectsMeta,
    skills
} from '../data/portfolioData';

const LanguageContext = createContext(null);

export const useLanguage = () => {
    const context = useContext(LanguageContext);
    if (!context) {
        throw new Error('useLanguage must be used within a LanguageProvider');
    }
    return context;
};

export const LanguageProvider = ({ children }) => {
    const { t, i18n } = useTranslation();
    const lang = i18n.resolvedLanguage === 'en' || i18n.language?.startsWith('en') ? 'en' : 'fr';
    const dictionary = i18n.getResourceBundle(lang, 'translation');

    const setLang = useCallback((next) => {
        if (next === 'fr' || next === 'en') {
            i18n.changeLanguage(next);
        }
    }, [i18n]);

    const toggleLang = useCallback(() => {
        i18n.changeLanguage(lang === 'fr' ? 'en' : 'fr');
    }, [i18n, lang]);

    const content = useMemo(() => {
        const c = dictionary.content;
        return {
            personalInfo: {
                ...personalMeta,
                role: c.role,
                tagline: c.tagline,
                description: c.description
            },
            about: {
                ...aboutMeta,
                bio: c.bio,
                stats: aboutMeta.stats.map((stat, index) => ({
                    ...stat,
                    label: c.stats[index]?.label || stat.label
                }))
            },
            projects: projectsMeta.map((project) => ({
                ...project,
                ...(c.projects[project.id] || {})
            })),
            experiences: experiencesMeta.map((item) => ({
                ...item,
                ...(c.experiences[item.id] || {})
            })),
            events: eventsMeta.map((event) => ({
                ...event,
                ...(c.events[event.id] || {})
            })),
            skills
        };
    }, [dictionary]);

    const value = useMemo(() => ({
        lang,
        setLang,
        toggleLang,
        t,
        dictionary,
        content,
        dateLocale: lang === 'en' ? 'en-GB' : 'fr-FR'
    }), [lang, setLang, toggleLang, t, dictionary, content]);

    return (
        <LanguageContext.Provider value={value}>
            {children}
        </LanguageContext.Provider>
    );
};
