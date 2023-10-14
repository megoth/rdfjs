import RdflibSolidDemo from "./demo";
import Login from "../login";
import {getDefaultSession, handleIncomingRedirect} from '@inrupt/solid-client-authn-browser'
import {useEffect, useState} from "react";

export default function RdflibSolid() {
    const session = getDefaultSession();
    const [isLoggedIn, setIsLoggedIn] = useState(session.info.isLoggedIn);

    useEffect(() => {
        handleIncomingRedirect({
            restorePreviousSession: true
        }).then((info) => setIsLoggedIn(!!info?.isLoggedIn));
    }, []);

    const login = async (providerUrl: string) => session.login({
        oidcIssuer: providerUrl,
        clientName: "RDF + JS = HEART (demo app)",
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