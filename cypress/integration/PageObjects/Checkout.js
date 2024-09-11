class CheckoutPage {
    fillCheckoutForm({ email, name, phone, city, address }) {
        cy.get("#checkout__email").type(email)
        cy.get("#checkout__billing_name").type(name)
        cy.get("#checkout__billing_phone").type(phone)
        cy.get("#checkout__billing_address_1").type(city)
        cy.get("#checkout__billing_address_1").type(address)
    }

    shippingMethods() {
        return cy.get("#checkout__shipping_method_7").click()
    }

    submitOrder() {
        return cy.get("#checkout__submit").click()
    }

    verifyCheckoutErrors() {
        cy.get(".parsley-type").should('contain', 'Trebuie să scrii un email valid.')
        cy.get(".parsley-pattern").should('contain', 'Acest câmp nu este completat corect')
    }
}

export default CheckoutPage
