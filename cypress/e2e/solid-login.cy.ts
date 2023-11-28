import {v4 as uuid} from 'uuid'

describe('Solid Login', () => {
    const timeout = 60000;
    const e2eServer = 'http://localhost:3001';
    let email: string, password: string, podName: string

    before(() => Cypress.on('uncaught:exception', () => false))
    after(() => Cypress.on('uncaught:exception', () => true))

    beforeEach(() => {
        email = `${uuid().substring(0, 13)}@test.com`
        password = uuid().substring(0, 13)
        podName = uuid().substring(0, 13)

        cy.visit('/', {timeout})
        cy.window().then(($win) => {
            cy.stub($win, "prompt").returns(e2eServer)
            cy.get('[data-test="CustomSolidProviderButton"]').click()
        })

        cy.get('#register-link[href]', {timeout}).click()
        cy.location('pathname', {timeout}).should('contain', 'register')

        cy.get('#email').type(email)
        cy.get("#password").type(password)
        cy.get('#confirmPassword').type(password)
        cy.get('#mainForm').submit()

        cy.get('#passwordLoginEntries', {timeout}).should('contain', email)
        cy.get('#createPod').click()
        cy.location('pathname', {timeout}).should('contain', 'pod')

        cy.get('#name', {timeout}).type(podName)
        cy.get('#mainForm').submit()
    });

    it('allows you to authenticate with a Solid account', () => {
        cy.visit('/', {timeout})
        cy.window().then(($win) => {
            cy.stub($win, "prompt").returns(e2eServer)
            cy.get('[data-test="CustomSolidProviderButton"]').click()
        })

        cy.get('#webIdList', {timeout}).should('contain', '/profile/card#me')
        cy.get('#authorize', {timeout}).click()
        cy.get('#SolidWarning.is-success', {timeout}).should('exist')
        cy.get('#SolidWarning.is-success', {timeout}).should('contain', 'Stranger')
    })
})
