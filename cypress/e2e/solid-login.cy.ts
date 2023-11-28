import {v4 as uuid} from 'uuid'

describe('Solid Login', () => {
    const timeout = 10000;
    const e2eServer = 'http://localhost:3001';
    let email: string, password: string, podName: string

    before(() => Cypress.on('uncaught:exception', () => false))
    after(() => Cypress.on('uncaught:exception', () => true))

    beforeEach('Creating Solid account', () => {
        email = `${uuid().substring(0, 13)}@test.com`
        password = uuid().substring(0, 13)
        podName = uuid().substring(0, 13)

        // visit frontpage
        cy.visit('/', {timeout})
        cy.window().then(($win) => {
            cy.stub($win, "prompt").returns(e2eServer)
            cy.get('[data-test="CustomSolidProviderButton"]').click()
        })

        // log in page
        cy.waitUntil(() => cy.get('#register-link').then(($el) => $el.attr('href')?.length > 0), {
            timeout: 2000,
            interval: 500,
        })
        cy.get('#register-link').click()

        // register new account page
        cy.contains("Register", { timeout }).should('exist')
        cy.get('#email').type(email)
        cy.get("#password").type(password)
        cy.get('#confirmPassword').type(`${password}{enter}`)

        // user account overview
        cy.get('#passwordLoginEntries', {timeout}).should('contain', email)
        cy.get('#createPod').click()

        // create pod page
        cy.contains("Choose a name for your pod", {timeout}).should('exist')
        cy.get('#name', {timeout}).type(`${podName}{enter}`)

        // user account page
        cy.contains('Your new Pod', {timeout}).should('exist')
        cy.get('#response-account-link', {timeout}).click();
        cy.get('#logout').click()

        // back to frontpage
        cy.get('#register-link', {timeout}).should('exist')
        cy.window().then(($win) => {
            $win.localStorage.clear()
        })
        cy.visit('/', {timeout})
    });

    it('allows you to authenticate with a Solid account', () => {
        cy.window().then(($win) => {
            cy.stub($win, "prompt").returns(e2eServer)
            cy.get('[data-test="CustomSolidProviderButton"]').click()
        })

        // log in page
        cy.get('#email', {timeout}).type(email)
        cy.get("#password").type(`${password}{enter}`)

        // authorize app page
        cy.get('#authorize', {timeout}).click()

        // back to frontpage
        cy.get('#SolidWarning.is-success', {timeout}).should('exist')
        cy.get('#SolidWarning.is-success', {timeout}).should('contain', 'Stranger')
    })
})
