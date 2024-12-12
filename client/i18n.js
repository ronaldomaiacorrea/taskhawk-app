import i18n from 'i18next';
import detector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';

import en from './src/locales/en.json';
import fr from './src/locales/fr.json';
import pt from './src/locales/pt-br.json';
import zh from './src/locales/zh.json';

const resources = {
  en: {
    translation: en,
  },
  fr: {
    translation: fr,
  },
  pt: {
    translation: pt,
  },
  zh: {
    translation: zh,
  },
};

i18n
  .use(detector)
  .use(initReactI18next)
  .init({
    resources,
    interpolation: {
      escapeValue: false,
    },
    debug: import.meta.env.DEV,
    fallBackLng: 'en',
  });

export default i18n;
