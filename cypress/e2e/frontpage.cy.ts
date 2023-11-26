import {GUIDES, LIBRARIES, LOCAL_DEMOS, P2P_DEMOS, SOLID_DEMOS} from "../../src/constants";

describe('frontpage', () => {
    beforeEach(() => {
        cy.visit('/')
    })

    it('displays title', () => {
        cy.get('h1.title').should('have.text', "RDF + JS = ")
    })

    it('displays a list of libraries', () => {
        cy.get('[data-test="Library"]').should('have.length', LIBRARIES.length)
    })

    it('displays a list of guides', () => {
        cy.get('[data-test="Guide"]').should('have.length', GUIDES.length)
    })

    it('displays a list of local demos', () => {
        cy.get('[data-test="LocalDemoList"] > [data-test="Demo"]').should('have.length', LOCAL_DEMOS.length)
    })

    it('displays a list of P2P demos', () => {
        cy.get('[data-test="P2PDemoList"] > [data-test="Demo"]').should('have.length', P2P_DEMOS.length)
    })

    it('displays a list of Solid demos', () => {
        cy.get('[data-test="SolidDemoList"] > [data-test="Demo"]').should('have.length', SOLID_DEMOS.length)
    })
})
