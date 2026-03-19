import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from './en';
import sk from './sk';

i18n.use(initReactI18next).init({
  resources: {
    en: { translation: en },
    sk: { translation: sk },
  },
  lng: 'sk',
  fallbackLng: 'en',
  interpolation: { escapeValue: false },
});

export default i18n;