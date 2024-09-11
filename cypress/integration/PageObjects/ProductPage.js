class ProductPage {

    clickOnWishList() {
        return cy.get(".product-action--add-to-favorites svg")
            .scrollIntoView()
            .should('be.visible')
            .click({ force: true })
    }

    selectFirstProduct() {
        return cy.get(".grid-image__image-wrapper").first().click()
    }

    verifyCartCount(count) {
        cy.waitForElementToBeVisible("a[title='Cart']").should('have.attr', "data-count", count.toString())
    }

    removeProductFromCart() {
        cy.get(".drawer-items__quantity-options").click()
        cy.get('.cart-drawer__empty-title').should('have.text', 'Cosul tau de cumparaturi este gol')
        cy.get('.btn-close').click()
    }

    addProductToFavorites() {
        cy.get(".product-action--add-to-favorites").click()
    }

    removeProductFromFavorites() {
        cy.get("a[title='Sterge din Favorite']").click()
    }
}

export default ProductPage

