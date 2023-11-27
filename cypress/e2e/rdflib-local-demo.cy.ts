describe('rdflib.js local demo', () => {
    const nameString = "Legolas"

    beforeEach(() => {
        cy.visit('/rdflib')
    })

    it('stores form value between page visits', () => {
        cy.get('#LocalDemo [data-test="DemoForm"] [name="name"]').clear().type(nameString)
        cy.get('#LocalDemo [data-test="DemoForm"]').submit()
        cy.reload()
        cy.get('#LocalDemo [data-test="DemoForm"] [name="name"]').should('have.value', nameString)
    })
})
