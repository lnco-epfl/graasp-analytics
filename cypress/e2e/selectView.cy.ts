import { Context, Item } from '@graasp/sdk';

import {
  SELECT_VIEW_ID,
  SELECT_VIEW_RENDERED_TEXT_ID,
  buildSelectViewId,
} from '@/config/selectors';

import { buildItemPath } from '../../src/config/paths';
import MOCK_ITEMS from '../../src/mockServer/mockData/items';

const visitItemPage = (item: Item) => {
  cy.visit(buildItemPath(item.id));
};

const checkContainViewText = (view: Context) =>
  cy.get(`#${buildSelectViewId(view)}`).should('contain', view);

describe('Select platform view ', () => {
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
});
