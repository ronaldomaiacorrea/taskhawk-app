import i18n from 'i18next';
import detector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';
import en from './locales/en.json';
import fr from './locales/fr.json';
import ch from './locales/ch.json';
import pt from './locales/pt-br.json';

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
	ch: {
		translation: ch,
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
