import { buildSignInPath } from '@graasp/sdk';

import { GRAASP_AUTH_HOST } from './env';

export const HOME_PATH = '/';
export const SHARED_ITEMS_PATH = '/shared';
export const ITEMS_PATH = '/items';
export const buildItemPath = (id = ':itemId'): string => `${ITEMS_PATH}/${id}`;
export const EMBEDDED_ITEM_PATH = '/embedded/:itemId';
export const SIGN_IN_PATH = buildSignInPath({ host: GRAASP_AUTH_HOST });
