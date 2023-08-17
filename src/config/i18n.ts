import { initReactI18next } from 'react-i18next';

import i18n from 'i18next';

import en from '../langs/en.json';
import fr from '../langs/fr.json';

declare module 'i18next' {
  interface CustomTypeOptions {
    returnNull: false;
  }
}

i18n.use(initReactI18next).init({
  resources: {
    en,
    fr,
  },
  fallbackLng: 'en',
  // debug only when not in production
  debug: import.meta.env.PROD,
  ns: ['translations'],
  defaultNS: 'translations',
  keySeparator: false,
  nsSeparator: false,
  interpolation: {
    escapeValue: false,
    formatSeparator: ',',
  },
  returnNull: false,
});

export default i18n;
