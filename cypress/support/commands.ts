/// <reference types="cypress" />
import { CookieKeys } from '@graasp/sdk';

import MOCK_ITEMS from '../fixtures/items';
import MOCK_MEMBERS from '../fixtures/members';
import MOCK_MEMBERSHIP from '../fixtures/membership';
import { buildDatabase } from './database';

Cypress.Commands.add(
  'setUpApi',
  ({
    currentMember = MOCK_MEMBERS[0],
    members = MOCK_MEMBERS,
    itemMemberships = MOCK_MEMBERSHIP,
    items = MOCK_ITEMS,
  } = {}) => {
    cy.setCookie(CookieKeys.Session, 'session_key');
    // mock api and database
    Cypress.on('window:before:load', (win: Window) => {
      // eslint-disable-next-line no-param-reassign
      win.database = buildDatabase({
        currentMember,
        items,
        itemMemberships,
        members,
      });
    });
  },
);
