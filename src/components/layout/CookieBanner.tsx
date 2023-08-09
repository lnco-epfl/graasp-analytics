import { COOKIE_KEYS } from '@graasp/sdk';
import { CookiesBanner } from '@graasp/ui';

import { DOMAIN } from '../../config/constants';

const Component = (): JSX.Element => (
  // todo: translate when using global translator
  <CookiesBanner cookieName={COOKIE_KEYS.ACCEPT_COOKIES_KEY} domain={DOMAIN} />
);
export default Component;
