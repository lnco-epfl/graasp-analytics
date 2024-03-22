export const HOME_PATH = '/';
export const SHARED_ITEMS_PATH = '/shared';
export const ITEMS_PATH = '/items';
export const buildItemPath = (id = ':itemId'): string => `${ITEMS_PATH}/${id}`;
export const EMBEDDED_ITEM_PATH = '/embedded/:itemId';

export const USERS_ANALYTICS_PATH = 'users';
export const ITEMS_ANALYTICS_PATH = 'items';
export const APPS_ANALYTICS_PATH = 'apps';

export const buildUsersAnalyticsPath = (id = ':itemId'): string =>
  `${ITEMS_PATH}/${id}/${USERS_ANALYTICS_PATH}`;
export const buildItemsAnalyticsPath = (id = ':itemId'): string =>
  `${ITEMS_PATH}/${id}/${ITEMS_ANALYTICS_PATH}`;
export const buildAppsAnalyticsPath = (id = ':itemId'): string =>
  `${ITEMS_PATH}/${id}/${APPS_ANALYTICS_PATH}`;
