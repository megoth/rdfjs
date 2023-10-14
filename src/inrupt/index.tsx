import {getDefaultSession, handleIncomingRedirect} from "@inrupt/solid-client-authn-browser";
import {useEffect, useState} from "react";
import Login from "../login";
import InruptDemo from "./demo";

export default function Inrupt() {
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
        await session.logout();
        setIsLoggedIn(session.info.isLoggedIn);
    }
    return (
        <>
            <h1 className="title">Inrupt’s JavaScript client libraries</h1>
            {isLoggedIn ? <>
                <InruptDemo/>
                <button className="button is-small" onClick={logout}>Log out</button>
            </> : <Login login={login}/>}
        </>
    )
}