import {
  HOME_MENU_DROPDOWN_BUTTON_ID,
  buildBreadcrumbsItemLink,
} from "../../src/config/selectors";

describe("Breadcrumbs", () => {
  beforeEach(() => {
    cy.setUpApi();
  });

  it("Home menu layout", () => {
    cy.visit("/");

    cy.get(`#${HOME_MENU_DROPDOWN_BUTTON_ID}`).click();

    // menuitem should be visible after clicking the dropdown button
    cy.get(`#${buildBreadcrumbsItemLink("home")}`).should("be.visible");
  });
});
