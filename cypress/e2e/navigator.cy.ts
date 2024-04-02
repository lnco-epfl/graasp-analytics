import { buildItemPath } from '@/config/paths';

import {
  HOME_MENU_DROPDOWN_BUTTON_ID,
  buildBreadcrumbsItemLink,
} from '../../src/config/selectors';
import MOCK_ITEMS from '../fixtures/items';

describe('Breadcrumbs', () => {
  beforeEach(() => {
    cy.setUpApi();
  });

  it('Menu items navigator', () => {
    cy.visit(buildItemPath(MOCK_ITEMS[0].id));

    cy.get(`#${HOME_MENU_DROPDOWN_BUTTON_ID}`).click();

    // menuitem should be visible after clicking the dropdown button
    cy.get(`#${buildBreadcrumbsItemLink('home')}`).should('be.visible');
  });
});
