import { initReactI18next, useTranslation } from 'react-i18next';

import buildI18n, { namespaces } from '@graasp/translations';

import ar from '../langs/ar.json';
import de from '../langs/de.json';
import en from '../langs/en.json';
import es from '../langs/es.json';
import fr from '../langs/fr.json';
import it from '../langs/it.json';

declare module 'i18next' {
  interface CustomTypeOptions {
    returnNull: false;
  }
}

const i18n = buildI18n().use(initReactI18next);

// add analytics translations
const ANALYTICS_NAMESPACE = 'analytics';
i18n.addResourceBundle('en', ANALYTICS_NAMESPACE, en);
i18n.addResourceBundle('it', ANALYTICS_NAMESPACE, it);
i18n.addResourceBundle('ar', ANALYTICS_NAMESPACE, ar);
i18n.addResourceBundle('de', ANALYTICS_NAMESPACE, de);
i18n.addResourceBundle('fr', ANALYTICS_NAMESPACE, fr);
i18n.addResourceBundle('es', ANALYTICS_NAMESPACE, es);

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const useAnalyticsTranslation = () =>
  useTranslation(ANALYTICS_NAMESPACE);
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const useCommonTranslation = () => useTranslation(namespaces.common);

export default i18n;
