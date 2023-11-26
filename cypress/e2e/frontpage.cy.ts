import {GUIDES, LIBRARIES, LOCAL_DEMOS, P2P_DEMOS, SOLID_DEMOS} from "../../src/constants";

describe('frontpage', () => {
    beforeEach(() => {
        cy.visit('http://localhost:5173')
    })

    it('displays title', () => {
        cy.get('h1.title').should('have.text', "RDF + JS = ")
    })

    it('displays a list of libraries', () => {
        cy.get('[data-test-id="Library"]').should('have.length', LIBRARIES.length)
    })

    it('displays a list of guides', () => {
        cy.get('[data-test-id="Guide"]').should('have.length', GUIDES.length)
    })

    it('displays a list of local demos', () => {
        cy.get('[data-test-id="LocalDemoList"] > [data-test-id="Demo"]').should('have.length', LOCAL_DEMOS.length)
    })

    it('displays a list of P2P demos', () => {
        cy.get('[data-test-id="P2PDemoList"] > [data-test-id="Demo"]').should('have.length', P2P_DEMOS.length)
    })

    it('displays a list of Solid demos', () => {
        cy.get('[data-test-id="SolidDemoList"] > [data-test-id="Demo"]').should('have.length', SOLID_DEMOS.length)
    })

    describe('demo', () => {
        it('displays the updated name in a notification', () => {
            cy.get('[data-test-id="DemoForm"] [name="name"]').type(" Test")
            cy.get('[data-test-id="DemoForm"]').submit()
            cy.get('[data-test-id="Notification').should('have.text', "Name updated: Test name Test")
        })

        describe('submit empty name field', () => {
            beforeEach(() => {
                cy.get('[data-test-id="DemoForm"] [name="name"]').clear()
                cy.get('[data-test-id="DemoForm"]').submit()
            })

            it('displays an error', () => {
                cy.get('[data-test-id="DemoFormNameRequired').should('have.text', "Name is required")
            })

            it('will not show notification', () => {
                cy.get('[data-test-id="Notification').should("have.length", 0)
            })
        })
    })
})
