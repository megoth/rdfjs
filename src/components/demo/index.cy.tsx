import Demo from "./index.tsx";
import {NotificationContextProvider} from "../../hooks/use-notification/provider.tsx";

describe('demo', () => {
    let spy: () => void;
    const nameString = "Frodo";

    beforeEach(() => {
        spy = cy.spy();
        cy.mount(<NotificationContextProvider>
            <Demo name={nameString} onSubmit={spy}/>
        </NotificationContextProvider>)
    })

    it("should set input value", () => {
        cy.get('[name="name"]').should('have.value', nameString)
    })

    describe('submit invalid form - empty name field', () => {
        beforeEach(() => {
            cy.get('[data-test="DemoForm"] [name="name"]').clear()
            cy.get('[data-test="DemoForm"]').submit()
        })

        it('will not provide form data', () => {
            expect(spy).not.to.be.called
        })

        it('will not show notification', () => {
            cy.get('[data-test="Notification').should("have.length", 0)
        })

        it('displays an error', () => {
            cy.get('[data-test="DemoFormNameRequired').should('have.text', "Name is required")
        })
    })

    describe('submit valid form', () => {
        const updatedNameString = "Gandalf"

        beforeEach(() => {
            cy.get('[data-test="DemoForm"] [name="name"]').clear().type(updatedNameString)
            cy.get('[data-test="DemoForm"]').submit()
        })

        it('provides the form data', () => {
            expect(spy).to.be.calledWith({name: updatedNameString})
        })

        it('displays the updated name in a notification', () => {
            cy.get('[data-test="Notification').should('have.text', `Name updated: ${updatedNameString}`)
        })
    })
})
