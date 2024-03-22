import {
  APPS_ID,
  APP_ITEM,
  APP_ITEM_CLASS_NAME,
  buildSidebarListItemId,
} from '@/config/selectors';

import { buildItemPath } from '../../src/config/paths';
import MOCK_ITEMS, {
  APP_ITEM_WITH_PARENT,
  CALC_APP_ITEM,
  CALC_APP_ITEM_WITH_PARENT,
} from '../fixtures/items';
import MOCK_MEMBERSHIP from '../fixtures/membership';

const visitItemPage = (
  item: { id: string },
  options: { moveToAnalytics?: boolean } = {},
) => {
  const { moveToAnalytics = true } = options;

  cy.visit(buildItemPath(item.id));
  if (moveToAnalytics) {
    cy.get(`#${buildSidebarListItemId(APP_ITEM)}`).click();
  }
};

const checkContainAppAnalytics = () => {
  cy.get(`#${buildSidebarListItemId(APP_ITEM)}`).should('exist');
  cy.get(`#${APPS_ID}`).should('exist');
};

describe('Check An App Item has an app analytics ', () => {
  beforeEach(() => {
    cy.setUpApi({ items: [CALC_APP_ITEM] });
  });

  it('Check that sidebar contain apps item list and apps section for app item', () => {
    visitItemPage(CALC_APP_ITEM);
    checkContainAppAnalytics();
  });
});

describe('Check Item with descendants app has an app analytics ', () => {
  beforeEach(() => {
    cy.setUpApi({
      items: [MOCK_ITEMS[0], APP_ITEM_WITH_PARENT, CALC_APP_ITEM_WITH_PARENT],
      itemMemberships: MOCK_MEMBERSHIP,
    });
  });

  it('Check that sidebar contain apps item list and apps section for parent with descendent app item', () => {
    visitItemPage(MOCK_ITEMS[0]);
    cy.get(`.${APP_ITEM_CLASS_NAME}`).should('have.length', 2);
  });

  it('Check that all descendants app has an analytic view', () => {
    visitItemPage(MOCK_ITEMS[0]);
    checkContainAppAnalytics();
  });
});

describe('Check non-app item does not show app analytics', () => {
  beforeEach(() => {
    cy.setUpApi();
  });

  it('Check that app section and list do not exist', () => {
    visitItemPage(MOCK_ITEMS[1], { moveToAnalytics: false });
    cy.get(`#${APPS_ID}`).should('not.exist');
  });
});
