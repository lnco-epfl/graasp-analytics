import { ExportActionsFormatting } from '@graasp/sdk';

import { buildExportAnalyticsPath } from '@/config/paths';
import {
  EXPORT_ACTIONS_BUTTON_ID,
  buildSelectExportFormatID,
} from '@/config/selectors';

import { ITEM_TO_EXPORT } from '../fixtures/items';
import MOCK_MEMBERS from '../fixtures/members';

describe('Check exporting analytics for allowed formats', () => {
  beforeEach(() => {
    cy.setUpApi({ items: [ITEM_TO_EXPORT], currentMember: MOCK_MEMBERS[0] });
  });

  [ExportActionsFormatting.CSV, ExportActionsFormatting.JSON].forEach(
    (format) => {
      it(`Check export to ${format} button disabled after first export`, () => {
        cy.visit(buildExportAnalyticsPath(ITEM_TO_EXPORT.id));
        cy.get(`#${buildSelectExportFormatID(format)}`).click({
          force: true,
        });
        cy.get(`#${EXPORT_ACTIONS_BUTTON_ID}`).click();
        cy.get(`#${EXPORT_ACTIONS_BUTTON_ID}`).should('be.disabled');
      });
    },
  );
});
