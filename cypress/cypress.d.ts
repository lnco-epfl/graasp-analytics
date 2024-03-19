declare namespace Cypress {
  interface Chainable {
    setUpApi(props?: Database): Chainable;
  }
}
