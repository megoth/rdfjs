import RdflibLocalDemo from "./index.tsx";
import {NotificationContextProvider} from "../../../hooks/use-notification/provider";
import {PROFILE_NAME} from "../../../constants";

describe('rdflib.js local demo', () => {
    beforeEach(() => {
        cy.mount(<NotificationContextProvider>
            <RdflibLocalDemo/>
        </NotificationContextProvider>)
    })

    it("sets name field to Test by default", () => {
        cy.get('[name="name"]').should('have.value', PROFILE_NAME)
    })
})
