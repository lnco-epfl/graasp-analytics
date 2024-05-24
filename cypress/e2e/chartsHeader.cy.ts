import { Context } from '@graasp/sdk';

import {
  SELECT_ACTION_ID,
  SELECT_USER_ID,
  SELECT_VIEW_ID,
  SELECT_VIEW_RENDERED_TEXT_ID,
  TAB_USERS,
  buildSelectViewId,
  buildSelectedActionChipId,
  buildSelectedUserChipId,
  buildSidebarListItemId,
} from '@/config/selectors';

import { buildItemPath } from '../../src/config/paths';
import MOCK_ACTION_DATA from '../fixtures/actions';
import MOCK_ITEMS from '../fixtures/items';
import MOCK_MEMBERS from '../fixtures/members';

const visitItemPage = (item: { id: string }) => {
  cy.visit(buildItemPath(item.id));
};

const checkContainViewText = (view: Context) =>
  cy.get(`#${buildSelectViewId(view)}`).should('contain', view);

describe('Select platform view ', () => {
  beforeEach(() => {
    cy.setUpApi();
  });

  it('select platform view should be library, or player, or builder', () => {
    visitItemPage(MOCK_ITEMS[0]);
    cy.get(`#${SELECT_VIEW_ID}`).click();
    [Context.Library, Context.Builder, Context.Player].forEach((ele) => {
      checkContainViewText(ele);
    });
  });

  it('change selected view', () => {
    visitItemPage(MOCK_ITEMS[0]);
    cy.get(`#${SELECT_VIEW_ID}`).click();
    cy.get(`#${buildSelectViewId(Context.Player)}`).click();
    cy.get(`#${SELECT_VIEW_RENDERED_TEXT_ID}`).should(
      'contain.text',
      Context.Player,
    );
  });

  it('values of view select should be maintained when navigating within different routes', () => {
    visitItemPage(MOCK_ITEMS[0]);
    cy.get(`#${SELECT_VIEW_ID}`).click();
    cy.get(`#${buildSelectViewId(Context.Player)}`).click();
    cy.get(`#${SELECT_VIEW_RENDERED_TEXT_ID}`).should(
      'contain.text',
      Context.Player,
    );
    cy.get(`#${buildSidebarListItemId(TAB_USERS)}`).click();

    cy.get(`#${SELECT_VIEW_ID}`).should('contain.text', Context.Player);
  });
});

describe('Select users', () => {
  beforeEach(() => {
    cy.setUpApi();
  });
  it('values of user select should be maintained when navigating within different routes', () => {
    visitItemPage(MOCK_ITEMS[0]);

    cy.get(`#${SELECT_USER_ID}`).click();
    cy.get(`#${SELECT_USER_ID}-option-0`).click();
    cy.get(`#${buildSelectedUserChipId(MOCK_MEMBERS[0].name)}`).should(
      'contain.text',
      MOCK_MEMBERS[0].name,
    );

    cy.get(`#${buildSidebarListItemId(TAB_USERS)}`).click();

    cy.get(`#${buildSelectedUserChipId(MOCK_MEMBERS[0].name)}`).should(
      'contain.text',
      MOCK_MEMBERS[0].name,
    );
  });
});
describe('Select actions', () => {
  beforeEach(() => {
    cy.setUpApi();
  });
  it('values of action select should be maintained when navigating within different routes', () => {
    visitItemPage(MOCK_ITEMS[0]);

    cy.get(`#${SELECT_ACTION_ID}`).click();
    cy.get(`#${SELECT_ACTION_ID}-option-0`).click();
    cy.get(
      `#${buildSelectedActionChipId(MOCK_ACTION_DATA.actions[0].type)}`,
    ).should('contain.text', MOCK_ACTION_DATA.actions[0].type);

    cy.get(`#${buildSidebarListItemId(TAB_USERS)}`).click();

    cy.get(
      `#${buildSelectedActionChipId(MOCK_ACTION_DATA.actions[0].type)}`,
    ).should('contain.text', MOCK_ACTION_DATA.actions[0].type);
  });
});
