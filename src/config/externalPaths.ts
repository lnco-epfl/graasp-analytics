import { buildSignInPath } from '@graasp/sdk';

import { GRAASP_AUTH_HOST } from './env';

export const SIGN_IN_PATH = buildSignInPath({ host: GRAASP_AUTH_HOST });
