class HomePage {

    visit() {
        cy.visit(Cypress.env("url"))
    }

    acceptCookie() {
        return cy.get('.cookie-policy-overlay__actions > :nth-child(1)').click()
    }

    verifyPageElements() {
        cy.url().should('contain', Cypress.env("url"))
        cy.get("#header_logo").should("be.visible")
        cy.get("#header_wrapper").should("be.visible")
        cy.get("#newsletter__submit").should("contain.text", "Aboneaza-te")
        cy.get("a[title='Contacteaza-ne']").should("contain.text", "Contacteaza-ne")
        cy.get("a[title='Intrebari frecvente']").should("contain.text", "Intrebari frecvente")
        cy.get("a[title='Istoric comenzi']").should("contain.text", "Istoric comenzi")

    }

    addProductToCart() {
        this.clickManereInteligenteTab();
        cy.url().should('contain', 'manere-inteligente-60')
        cy.addProduct();
        cy.waitForElementToBeVisible("button[class='product__add-to-cart custom-add-to-cart']").click()
        cy.waitForElementToBeVisible(".btn-wrapper button").click()
        cy.get(".cart-summary__title > span:last-child")
            .should('be.visible')
            .and('contain.text', "1 produs(e)")
    }

    verifySearchResults(term) {
        cy.get('.page__heading').should('be.visible').and('contain.text', term)
    }

    verifyNoResults(term) {
        cy.get('.missing-records__message').should('be.visible')
            .and('contain.text', `Cautarea ta dupa ${term} nu a intors niciun rezultat.`)
    }

    sortResults(sortBy) {
        cy.get("#sort_options").select(sortBy).should('be.visible')
        cy.url().should('contain', sortBy)
    }

    verifySortedResults(sortBy) {
        cy.url().should('contain', sortBy)
    }

    verifyAutocompleteSuggestions(term) {
        cy.get('.ss-results > :nth-child(1)').should('be.visible')
        cy.get('.ss-results > :nth-child(1)').each((element) => {
            cy.wrap(element).should('contain.text', term);
        });
    }

    verifyFavoriteCount(count) {
        cy.waitForElementToBeVisible(".header__action--favorites").should('have.attr', "data-count", count.toString())
    }

    navigateToPage(pageNumber) {
        cy.get(`.pagination__pages > li:nth-child(${pageNumber})`).click()
    }

    verifySearchResults(term) {
        cy.get('.page__heading').should('be.visible').and('contain.text', term)
    }

    verifyCurrentPage(pageNumber) {
        cy.url().should('contain', `p${pageNumber}`)
    }

    clickManereInteligenteTab() {
        return cy.get(".header__menu-list > li:nth-child(4)").click()
    }

    clickSculeTab() {
        return cy.get(".header__menu-list > li:nth-child(5)").click()
    }

    search() {
        return cy.get("input[class='search-inline__input form-control']")
    }

    searchIcon() {
        return cy.get('.search-inline__button')
    }
}

export default HomePage;

