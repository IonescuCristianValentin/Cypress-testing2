Cypress.Commands.add('addProduct', () => {
  cy.get("li[id='header_menu_item_100066102'] a").click()    
  cy.get(".product.product--grid").first().click()
})

Cypress.Commands.add('waitForElementToBeVisible', (selector, timeout = 10000) => {
  cy.get(selector, { timeout }).should('be.visible');
});

Cypress.Commands.add('login', (username, password) => {
  cy.get('#email').type(username), {force: true}
  cy.get('#pass').type(password);
  cy.get('#send2').click();
});

Cypress.Commands.add('generateRandomString', (length) => {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
  let result = '';
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength))
  }
  return result;
});

Cypress.Commands.add('addProductToCart', (productName) => {
  cy.visit(Cypress.env('url'))
  cy.get("input[class='search-inline__input form-control']").type(productName).type('{enter}');
  cy.get(".grid-image__image-wrapper").contains(productName).first().click({force: true})
  cy.get('select').select('Gold')
  cy.get("button[class='product__add-to-cart custom-add-to-cart']").click()
  cy.get(".drawer-items__item-name").should('be.visible').and('contain.text', `${productName}`)
});

Cypress.Commands.add('waitForPageReload', () => {
  cy.window().then((win) => {
      cy.wrap(win.document).its('readyState').should('eq', 'complete')
  });

  cy.location('href', { timeout: 10000 }).should('not.include', 'loading')
});

 







