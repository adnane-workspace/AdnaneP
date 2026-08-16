import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from './locales/en';
import fr from './locales/fr';

const savedLang = localStorage.getItem('lang');
const initialLang = savedLang === 'en' || savedLang === 'fr' ? savedLang : 'fr';

i18n.use(initReactI18next).init({
    resources: {
        fr: { translation: fr },
        en: { translation: en }
    },
    lng: initialLang,
    fallbackLng: 'fr',
    interpolation: {
        escapeValue: false
    },
    react: {
        useSuspense: false
    }
});

const applyDocumentLang = (lng) => {
    const language = lng?.startsWith('en') ? 'en' : 'fr';
    document.documentElement.lang = language;
    localStorage.setItem('lang', language);
    const description = document.querySelector('meta[name="description"]');
    if (description) {
        description.setAttribute('content', i18n.t('meta.description'));
    }
};

applyDocumentLang(i18n.language);
i18n.on('languageChanged', applyDocumentLang);

export default i18n;
