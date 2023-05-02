/// <reference types="cypress" />
import { COOKIE_KEYS } from '@graasp/sdk';

import MOCK_ITEMS from '../../src/mockServer/mockData/items';
import MOCK_MEMBERS from '../../src/mockServer/mockData/members';
import MOCK_MEMBERSHIP from '../../src/mockServer/mockData/membership';
import { buildDatabase } from '../../src/mockServer/mockServer';

Cypress.Commands.add('setUpApi', () => {
  cy.setCookie(COOKIE_KEYS.SESSION_KEY, 'session_key');
  // mock api and database
  Cypress.on('window:before:load', (win) => {
    // eslint-disable-next-line no-param-reassign
    win.database = buildDatabase({
      currentMember: MOCK_MEMBERS[0],
      items: MOCK_ITEMS,
      itemMemberships: MOCK_MEMBERSHIP,
      members: MOCK_MEMBERS,
    });
  });
});
