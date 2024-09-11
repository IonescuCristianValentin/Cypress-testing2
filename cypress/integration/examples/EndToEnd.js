import HomePage from "../PageObjects/HomePage";
import CheckoutPage from "../PageObjects/Checkout";
import ProductPage from "../PageObjects/ProductPage";

describe("E-commerce Site Tests", function () {
  let homePage;
  let checkoutPage;
  let productPage;

  before(function () {
    cy.fixture("example").then(function (data) {
      this.data = data;
    })
  })
  beforeEach(function () {
    homePage = new HomePage()
    checkoutPage = new CheckoutPage()
    productPage = new ProductPage()
    homePage.visit(Cypress.env("url"))
    homePage.acceptCookie()
  })

  it("Should display errors when required checkout details are wrong", function () {

    homePage.verifyPageElements()
    homePage.addProductToCart()

    checkoutPage.fillCheckoutForm({
      email: this.data.email,
      name: this.data.name,
      phone: this.data.phone,
      city: this.data.city,
      address: this.data.address,
    });

    checkoutPage.shippingMethods()
    checkoutPage.submitOrder()
    checkoutPage.verifyCheckoutErrors()
  });

  it("Should return relevant results for a valid search term", function () {
    homePage.search().type('Manere Inteligente')
    homePage.searchIcon().click()
    homePage.verifySearchResults('Manere Inteligente')
  });

  it("Should show no results for an invalid search term", function () {
    homePage.search().type('ProdusInexistent')
    homePage.searchIcon().click()
    homePage.verifyNoResults('ProdusInexistent')
  });

  it("Should show autocomplete suggestions when typing in the search input", function () {
    homePage.search().type('PVC')
    homePage.verifyAutocompleteSuggestions('PVC')
  });

  it("Should sort search results correctly", function () {
    homePage.search().type('PVC')
    homePage.searchIcon().click()
    homePage.sortResults('price_asc')
    homePage.verifySortedResults('price_asc')
    homePage.sortResults('price_desc')
    homePage.verifySortedResults('price_desc')
  });

  it("Should allow adding a product to the favorite list, display it in the favorite list, and remove it from the list", () => {
    homePage.clickSculeTab()
    productPage.selectFirstProduct()
    productPage.addProductToFavorites()
    homePage.verifyFavoriteCount(1)
    productPage.removeProductFromFavorites()
    homePage.verifyFavoriteCount("")
  });

  it("Should remove a product from the cart and verify cart details", function () {
    cy.addProductToCart("Maner")
    productPage.removeProductFromCart()
    productPage.verifyCartCount("")
  });

  it("Should navigate between different pages and verify page elements", function () {
    homePage.clickManereInteligenteTab()
    cy.url().should('contain', 'manere-inteligente-60')
    homePage.verifyPageElements()

    homePage.clickSculeTab()
    cy.url().should('contain', 'scule-35')
    homePage.verifyPageElements()
  });

  it("Should handle pagination for search results", function () {
    homePage.search().type('PVC')
    homePage.searchIcon().click()
    homePage.navigateToPage(3)
    homePage.verifyCurrentPage(3)
    homePage.verifySearchResults('PVC')
  });

  it("Should apply filters correctly and show filtered results", function () {
    homePage.clickSculeTab()
    cy.get("#facet_price > .facet__title").click()
    cy.get("input[placeholder='de la']").as('minPrice')
    cy.get("label[aria-label$='max'] input[placeholder='pana la']").as('maxPrice')

    cy.get('@minPrice').click().clear({ force: true }).type("10", { force: true })
    cy.get('@minPrice').then(() => {
      cy.get('@minPrice').should('have.value', '10')
    });

    cy.waitForPageReload()

    cy.get('@maxPrice').click()
    cy.get('@maxPrice').clear({ force: true }).type("50", { force: true })
    cy.get('#facet_price > .facet__content > .facet__options').click()
    cy.get('@maxPrice').then(() => {
      cy.get('@maxPrice').should('have.value', '50')
    });
    cy.get('@minPrice').should('have.value', '10')
    cy.get('@maxPrice').should('have.value', '50')

    cy.get(".product--grid").each((price) => {
      cy.wrap(price).find('.product__info--price-gross').invoke('text').then((text) => {
        const priceText = text.trim().replace('RON', '').replace(',', '.');
        const price = parseFloat(priceText);
        expect(price).to.be.within(10, 50);
      });
    });
  });
});

