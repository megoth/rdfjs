import RdflibSolidDemo from "./demo";
import Login from "../login";
import {EVENTS, getDefaultSession} from '@inrupt/solid-client-authn-browser'
import {useState} from "react";

export default function RdflibSolid() {
    const session = getDefaultSession();
    const [isLoggedIn, setIsLoggedIn] = useState(session.info.isLoggedIn);
    session.on(EVENTS.LOGIN, () => setIsLoggedIn(session.info.isLoggedIn));
    session.on(EVENTS.SESSION_RESTORED, () => setIsLoggedIn(session.info.isLoggedIn));
    session.on(EVENTS.SESSION_EXPIRED, () => setIsLoggedIn(session.info.isLoggedIn));

    const login = async (providerUrl: string) => session.login({
        oidcIssuer: providerUrl,
        clientName: "RDF + JS = &#10084; (demo app)",
    });

    const logout = async () => {
        await session.logout({
            logoutType: "app",
        });
        await session.handleIncomingRedirect();
        setIsLoggedIn(session.info.isLoggedIn);
    }

    return <>
        <h1 className="title">rdflib.js with Solid</h1>
        {isLoggedIn ? <>
            <RdflibSolidDemo/>
            <button className="button is-small" onClick={logout}>Log out</button>
        </> : <Login login={login}/>}
    </>
}