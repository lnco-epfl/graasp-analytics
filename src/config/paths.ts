export const HOME_PATH = '/';
export const SHARED_ITEMS_PATH = '/shared';
export const ITEMS_PATH = '/items';
export const buildItemPath = (id = ':itemId'): string => `${ITEMS_PATH}/${id}`;
export const ITEM_PATH = '/items/:itemId';
export const EMBEDDED_ITEM_PATH = '/embedded/:itemId';
